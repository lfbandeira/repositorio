const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: "EMBALAGEM",
};

async function getEmbalagem(parametros) {
  try {
   
    const data = await dynamodb.query(parametros).promise();
    return data;
  } catch (err) {
    return err;
  }
}



exports.consultaPaginada = async function (event, context) {
  try {
    let bd = JSON.parse(event.body);

    const { cpf_cnpj, limite, ultimaChave } = bd;

    if (ultimaChave.idEmbalagem) {
      var params = {
        TableName: "EMBALAGEM",
        KeyConditionExpression: "#p1 = :valorP1",
        ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
        ExpressionAttributeValues: { ":valorP1": cpf_cnpj },
        ScanIndexForward: true,
        Limit: limite,
        ExclusiveStartKey: ultimaChave,
      };

      const dados = await getEmbalagem(params);

      if (dados.Count == 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Embalagem não encontrada" }, null, 2),
        };
      } else {
        const embalagens = dados;
        return {
          statusCode: 200,
          body: JSON.stringify(embalagens, null, 2),
        };
      }
    } else {
      var params = {
        TableName: "EMBALAGEM",
        KeyConditionExpression: "#p1 = :valorP1",
        ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
        ExpressionAttributeValues: { ":valorP1": cpf_cnpj },
        ScanIndexForward: true,
        Limit: limite,
      };
      const dados = await getEmbalagem(params);
      if (dados.Count == 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Embalagem não encontrada" }, null, 2),
        };
      } else {
        //const embalagens = dados.Items;
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


exports.buscaContagem = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.pathParameters);
   
    const cpfCnpj = JSON.parse(parametros).cpf_cnpj;

    const params = {
      TableName: "EMBALAGEM",
      KeyConditionExpression: "cpf_cnpj = :pk",
      ExpressionAttributeValues: {
        ":pk": cpfCnpj,
      },
    };

    const dados = await getEmbalagem(params);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Embalagem não encontrada" }, null, 2),
      };
    }
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

exports.listaPorId = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.pathParameters);
    
    const idEmbalagem = JSON.parse(parametros).idEmbalagem;
    const cpfCnpj = JSON.parse(parametros).cpf_cnpj;

    const params = {
      TableName: "EMBALAGEM",
      KeyConditionExpression: "cpf_cnpj = :pk and idEmbalagem= :sk",
      ExpressionAttributeValues: {
        ":pk": cpfCnpj,
        ":sk": idEmbalagem,
      },
    };

    const dados = await getEmbalagem(params);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Embalagem não encontrada" }, null, 2),
      };
    }
    const embalagem = dados.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(embalagem, null, 2),
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
   
    var params = {
      TableName: "EMBALAGEM",
      KeyConditionExpression: "#p1 = :valorP1",
      ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
      ExpressionAttributeValues: { ":valorP1": cpfCnpjParametro },
      Limit: 5
    };

    const dados = await getEmbalagem(params);
    
  
    
   
    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Embalagem não encontrada" }, null, 2),
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

exports.listarCombo = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.queryStringParameters);
    const cpfCnpjParametro = JSON.parse(parametros).cpf_cnpj;
   
    var params = {
      TableName: "EMBALAGEM",
      KeyConditionExpression: "#p1 = :valorP1",
      ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
      ExpressionAttributeValues: { ":valorP1": cpfCnpjParametro }
    };

    const dados = await getEmbalagem(params);
    
  
    
   
    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Embalagem não encontrada" }, null, 2),
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


exports.cadastrarEmbalagem = async function (event, context) {
  try {
    let dados = JSON.parse(event.body);
    const timestamp = new Date().getTime();
    const { cpf_cnpj, idEmbalagem, descricao } = dados;

    const listaEvento = {
      cpf_cnpj: cpf_cnpj,
      idEmbalagem: idEmbalagem,
      descricao,
      criado_em: timestamp,
    };

    await dynamodb
      .put({
        TableName: "EMBALAGEM",
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
