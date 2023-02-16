const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function soma(dados) {
  let totalEstoque = 0;
  console.log("Somando...");
  await dados.forEach((element) => {
    totalEstoque += element.quantidade;
  });
  return totalEstoque * -1;
}
async function getEstoque(parametros) {
  try {
    console.log("entrou no método...");
    console.log(parametros);

    const data = await dynamodb.query(parametros).promise();
    return data;
  } catch (err) {
    return err;
  }
}

exports.listaSinteticaBaixa = async function (event, context) {
  try {
    console.log(event);
    const parametros = JSON.stringify(event.pathParameters);
    console.log(parametros);
    console.log("Nova funcao");
    const chaveSk = JSON.parse(parametros).chave;
    const cpfCnpj = JSON.parse(parametros).cpf_cnpj;

    console.log(chaveSk);
    console.log(cpfCnpj);
    const params = {
      TableName: "BAIXA",
      KeyConditionExpression: "cpf_cnpj = :pk and begins_with(chave, :sk)",
      ExpressionAttributeValues: {
        ":pk": cpfCnpj,
        ":sk": chaveSk + "|",
      },
    };

    const dados = await getEstoque(params);
    console.log(dados);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Estoque não encontrado" }, null, 2),
      };
    }
    const estoque = JSON.stringify(dados.Items);

    const retorno = JSON.parse(estoque);
    /* Função que encontra o total em estoque do produto */

   const obj = await soma(retorno).then((resposta) => {
      console.log("Retorno da soma..." + resposta);
      const obj = {
        descProduto: retorno[0].descProduto,
        descEmbalagem: retorno[0].descEmbalagem,
        descUnidade: retorno[0].descUnidade,
        totalEmEstoque: resposta,
      };

      console.log(obj);
      return obj;
    });
    return {
      statusCode: 200,
      body: JSON.stringify(obj),
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

exports.listaAnaliticaBaixa = async function (event, context) {
  try {
    console.log(event);
    const parametros = JSON.stringify(event.pathParameters);
    console.log(parametros);

    const chaveSk = JSON.parse(parametros).chave;
    const cpfCnpj = JSON.parse(parametros).cpf_cnpj;

    console.log(chaveSk);
    console.log(cpfCnpj);
    const params = {
      TableName: "BAIXA",
      KeyConditionExpression: "cpf_cnpj = :pk and begins_with(chave, :sk)",
      ExpressionAttributeValues: {
        ":pk": cpfCnpj,
        ":sk": chaveSk + "|",
      },
    };

    const dados = await getEstoque(params);
    console.log(dados);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Estoque não encontrado" }, null, 2),
      };
    }
    const estoque = dados.Items;
    return {
      statusCode: 200,
      body: JSON.stringify(estoque, null, 2),
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

exports.cadastrarBaixa = async function (event, context) {
  try {
    console.log("Versão Original...");
    let dados = JSON.parse(event.body);
    const timestamp = new Date().getTime();
    const {
      cpf_cnpj,
      chave,
      usuario,
      data,
      descProduto,
      quantidade,
      obs,
      descEmbalagem,
      descUnidade,
    } = dados;

    const listaEvento = {
      cpf_cnpj: cpf_cnpj,
      chave: chave + "|" + timestamp,
      usuario,
      data,
      descProduto,
      quantidade,
      obs,
      descEmbalagem,
      descUnidade,
      dataOcorrencia: timestamp,
    };

    await dynamodb
      .put({
        TableName: "BAIXA",
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
