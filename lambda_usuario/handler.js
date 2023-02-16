const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: "USUARIO",
};

async function getUsuarios(parametros) {
  try {
    console.log("entrou no método...");
    console.log(parametros);

    const data = await dynamodb.query(parametros).promise();
    return data;
  } catch (err) {
    return err;
  }
}

exports.buscaContagem = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.pathParameters);
    console.log(parametros);
    console.log('Entrou no Busca Contagem');
    const cpfCnpj = JSON.parse(parametros).cpf_cnpj;

    console.log(cpfCnpj);
    const params = {
      TableName: "USUARIO",
      KeyConditionExpression: "cpf_cnpj = :pk",
      ExpressionAttributeValues: {
        ":pk": cpfCnpj,
      },
    };

    const dados = await getUsuarios(params);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Usuario não encontrado" }, null, 2),
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

exports.listarTodos = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.queryStringParameters);
    const cpfCnpjParametro = JSON.parse(parametros).cpf_cnpj;
    console.log('Entrou no Listar todos')
    console.log(cpfCnpjParametro);

    var params = {
      TableName: "USUARIO",
      KeyConditionExpression: "#p1 = :valorP1",
      ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
      ExpressionAttributeValues: { ":valorP1": cpfCnpjParametro },
      Limit:5
    };

    const dados = await getUsuarios(params);
    
  
    
    console.log(dados);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Usuario não encontrado" }, null, 2),
      };
    }
    const usuarios = dados.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(usuarios, null, 2),
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

exports.listarPorLogin = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.pathParameters);
    console.log(parametros);

    const login = JSON.parse(parametros).login;
    const cpfCnpj = JSON.parse(parametros).cpf_cnpj;

    console.log(login);
    console.log(cpfCnpj);
    const params = {
      TableName: "USUARIO",
      KeyConditionExpression: "cpf_cnpj = :pk and begins_with(chave, :sk)",
      ExpressionAttributeValues: {
        ":pk": cpfCnpj,
        ":sk": login + "|",
      },
    };

    const dados = await getUsuarios(params);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Usuário não encontrado" }, null, 2),
      };
    }
    const usuarios = dados.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(usuarios, null, 2),
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

exports.efetuarLogin = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.pathParameters);
    console.log(parametros);

    const chave = JSON.parse(parametros).chave;
    const cpfCnpj = JSON.parse(parametros).cpf_cnpj;
    console.log(chave);
    
    const params = {
      TableName: "USUARIO",
      KeyConditionExpression: "cpf_cnpj= :pk and chave= :sk",
      ExpressionAttributeValues: {
        ":pk": cpfCnpj,
        ":sk": chave,
      },
    };

    const dados = await getUsuarios(params);
    console.log(dados);
    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Usuário não encontrado" }, null, 2),
      };
    }
    console.log(dados);

    const usuarios = dados.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(usuarios[0], null, 2),
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

exports.cadastrarUsuario = async function (event, context) {
  try {
    console.log("Versão Original...");
    let dados = JSON.parse(event.body);
    const timestamp = new Date().getTime();
    const { cpf_cnpj, login, nome, senha, excluido } = dados;

    const listaEvento = {
      cpf_cnpj: cpf_cnpj,
      chave:login+'|'+senha,
      login: login,
      nome,
      senha,
      excluido,
      criado_em: timestamp,
    };

    await dynamodb
      .put({
        TableName: "USUARIO",
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

    if (ultimaChave.chave) {
      var params = {
        TableName: "USUARIO",
        KeyConditionExpression: "#p1 = :valorP1",
        ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
        ExpressionAttributeValues: { ":valorP1": cpf_cnpj },
        ScanIndexForward: true,
        Limit: limite,
        ExclusiveStartKey: ultimaChave,
      };

      const dados = await getUsuarios(params);

      if (dados.Count == 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Usuario não encontrado" }, null, 2),
        };
      } else {
        const usuarios = dados;
        return {
          statusCode: 200,
          body: JSON.stringify(usuarios, null, 2),
        };
      }
    } else {
      var params = {
        TableName: "USUARIO",
        KeyConditionExpression: "#p1 = :valorP1",
        ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
        ExpressionAttributeValues: { ":valorP1": cpf_cnpj },
        ScanIndexForward: true,
        Limit: limite,
      };
      const dados = await getUsuarios(params);
      if (dados.Count == 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Usuario não encontrado" }, null, 2),
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
