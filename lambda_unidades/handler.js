const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: "UNID_VENDA",
};

async function getUnidade(parametros) {
  try {
    console.log("entrou no método...");
    console.log(parametros);

    const data = await dynamodb.query(parametros).promise();
    return data;
  } catch (err) {
    return err;
  }
}


exports.unidadePorId = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.pathParameters);
    console.log(parametros);

    const idUnidade = JSON.parse(parametros).idUnidade;
    const cpfCnpj = JSON.parse(parametros).cpf_cnpj;

    console.log(idUnidade);
    console.log(cpfCnpj);
    const params = {
      TableName: "UNID_VENDA",
      KeyConditionExpression: "cpf_cnpj = :pk and idUnidade= :sk",
      ExpressionAttributeValues: {
        ":pk": cpfCnpj,
        ":sk": idUnidade,
      },
    };

    const dados = await getUnidade(params);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Unidade não encontrada" }, null, 2),
      };
    }
    const unidades = dados.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(unidades, null, 2),
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

exports.buscaContagem = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.pathParameters);
    console.log(parametros);

    const cpfCnpj = JSON.parse(parametros).cpf_cnpj;

    console.log(cpfCnpj);
    const params = {
      TableName: "UNID_VENDA",
      KeyConditionExpression: "cpf_cnpj = :pk",
      ExpressionAttributeValues: {
        ":pk": cpfCnpj,
      },
    };

    const dados = await getUnidade(params);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Unidade não encontrada" }, null, 2),
      };
    }
    console.log('Contador encontrado...' + dados.Count)
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

exports.listarTodas = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.queryStringParameters);
    const cpfCnpjParametro = JSON.parse(parametros).cpf_cnpj;
    console.log(cpfCnpjParametro);

    var params = {
      TableName: "UNID_VENDA",
      KeyConditionExpression: "#p1 = :valorP1",
      ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
      ExpressionAttributeValues: { ":valorP1": cpfCnpjParametro },
      Limit:5
    };

    const dados = await getUnidade(params);
    
  
    
    console.log(dados);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Unidade de venda não encontrada" }, null, 2),
      };
    }
    const centrais = dados.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(centrais, null, 2),
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

exports.scanTable = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.queryStringParameters);
    const cpfCnpjParametro = JSON.parse(parametros).cpf_cnpj;
    console.log(cpfCnpjParametro);

    var params = {
      TableName: "UNID_VENDA",
      KeyConditionExpression: "#p1 = :valorP1",
      ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
      ExpressionAttributeValues: { ":valorP1": cpfCnpjParametro }
    };

    const dados = await getUnidade(params);
    
  
    
    console.log(dados);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Unidade de venda não encontrada" }, null, 2),
      };
    }
    const centrais = dados.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(centrais, null, 2),
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


exports.cadastrarUnidade = async function (event, context) {
  try {
    console.log("Versão Original...");
    let dados = JSON.parse(event.body);
    const timestamp = new Date().getTime();
    const { cpf_cnpj, idUnidade, descricao, cidade, bairro } = dados;

    const listaEvento = {
      cpf_cnpj: cpf_cnpj,
      idUnidade: idUnidade,
      descricao,
      cidade,
      bairro,
      criado_em: timestamp,
    };

    await dynamodb
      .put({
        TableName: "UNID_VENDA",
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

    if (ultimaChave.idUnidade) {
      var params = {
        TableName: "UNID_VENDA",
        KeyConditionExpression: "#p1 = :valorP1",
        ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
        ExpressionAttributeValues: { ":valorP1": cpf_cnpj },
        ScanIndexForward: true,
        Limit: limite,
        ExclusiveStartKey: ultimaChave,
      };

      const dados = await getUnidade(params);

      if (dados.Count == 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Unidade não encontrada" }, null, 2),
        };
      } else {
        const unidades = dados;
        return {
          statusCode: 200,
          body: JSON.stringify(unidades, null, 2),
        };
      }
    } else {
      var params = {
        TableName: "UNID_VENDA",
        KeyConditionExpression: "#p1 = :valorP1",
        ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
        ExpressionAttributeValues: { ":valorP1": cpf_cnpj },
        ScanIndexForward: true,
        Limit: limite,
      };
      const dados = await getUnidade(params);
      if (dados.Count == 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Unidade não encontrada" }, null, 2),
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