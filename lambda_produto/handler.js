const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: "PRODUTO",
};

async function getProduto(parametros) {
  try {
    console.log("entrou no método...");
    console.log(parametros);

    const data = await dynamodb.query(parametros).promise();

    return data;
  } catch (err) {
    console.log(err);
  }
}

exports.listaPorId = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.pathParameters);
    console.log(parametros);

    const idProduto = JSON.parse(parametros).idProduto;
    const cpfCnpj = JSON.parse(parametros).cpf_cnpj;

    console.log(idProduto);
    console.log(cpfCnpj);
    const params = {
      TableName: "PRODUTO",
      KeyConditionExpression: "cpf_cnpj = :pk and idProduto= :sk",
      ExpressionAttributeValues: {
        ":pk": cpfCnpj,
        ":sk": idProduto,
      },
    };

    const dados = await getProduto(params);
    console.log("Retorno....");
    console.log(dados);

    if (dados.Count > 0) {
      const produtos = dados.Items;
      return {
        statusCode: 200,
        body: JSON.stringify(produtos, null, 2),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify(
          [{ idProduto: "", cpf_cnpj: "", descricao: "", descEmbalagem: "" }],
          null,
          2
        ),
      };
    }
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};

exports.buscaContagem = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.pathParameters);
    console.log(parametros);

    const cpfCnpj = JSON.parse(parametros).cpf_cnpj;

    console.log(cpfCnpj);
    const params = {
      TableName: "PRODUTO",
      KeyConditionExpression: "cpf_cnpj = :pk",
      ExpressionAttributeValues: {
        ":pk": cpfCnpj,
      },
    };

    const dados = await getProduto(params);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Produto não encontrado" }, null, 2),
      };
    }
    console.log("Contador encontrado..." + dados.Count);
    const retorno = {
      proximoItem: dados.Count + 1,
    };
    return {
      statusCode: 200,
      body: JSON.stringify(retorno, null, 2),
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};
exports.listarTodos = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.queryStringParameters);
    const cpfCnpjParametro = JSON.parse(parametros).cpf_cnpj;
    console.log(cpfCnpjParametro);

    var params = {
      TableName: "PRODUTO",
      KeyConditionExpression: "#p1 = :valorP1",
      ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
      ExpressionAttributeValues: { ":valorP1": cpfCnpjParametro },
      Limit: 5,
    };

    const dados = await getProduto(params);

    console.log(dados);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Produto não encontrado" }, null, 2),
      };
    }
    const produtos = dados.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(produtos, null, 2),
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};

exports.cadastrarProduto = async function (event, context) {
  try {
    console.log("Versão Original...");
    let dados = JSON.parse(event.body);
    const timestamp = new Date().getTime();
    const { cpf_cnpj, idProduto, descricao, descEmbalagem } = dados;

    const listaEvento = {
      cpf_cnpj: cpf_cnpj,
      idProduto: idProduto,
      descricao,
      descEmbalagem,
      criado_em: timestamp,
    };

    await dynamodb
      .put({
        TableName: "PRODUTO",
        Item: listaEvento,
      })
      .promise();

    return {
      statusCode: 201,
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};



exports.consultaPaginada = async function (event, context) {
  try {
    let bd = JSON.parse(event.body);

    const { cpf_cnpj, limite, ultimaChave } = bd;

    if (ultimaChave.idProduto) {
      var params = {
        TableName: "PRODUTO",
        KeyConditionExpression: "#p1 = :valorP1",
        ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
        ExpressionAttributeValues: { ":valorP1": cpf_cnpj },
        ScanIndexForward: true,
        Limit: limite,
        ExclusiveStartKey: ultimaChave,
      };

      const dados = await getProduto(params);

      if (dados.Count == 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "produto não encontrado" }, null, 2),
        };
      } else {
        const produtos = dados;
        return {
          statusCode: 200,
          body: JSON.stringify(produtos, null, 2),
        };
      }
    } else {
      var params = {
        TableName: "PRODUTO",
        KeyConditionExpression: "#p1 = :valorP1",
        ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
        ExpressionAttributeValues: { ":valorP1": cpf_cnpj },
        ScanIndexForward: true,
        Limit: limite,
      };
      const dados = await getProduto(params);
      if (dados.Count == 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Produto não encontrado" }, null, 2),
        };
      } else {
        
        return {
          statusCode: 200,
          body: JSON.stringify(dados, null, 2),
        };
      }
    }
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};
