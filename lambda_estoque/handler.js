const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();


async function soma(dados) {
  let totalEstoque = 0;
  console.log("Somando...");
  await dados.forEach((element) => {
    totalEstoque += element.quantidade;
  });
  return totalEstoque;
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

exports.cadastrarAporte = async function (event, context) {
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
        TableName: "APORTE",
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