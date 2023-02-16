const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getEmbalagem(parametros) {
  try {
    console.log("entrou no método...");
    console.log(parametros);

    const data = await dynamodb.query(parametros).promise();
    return data;
  } catch (err) {
    return err;
  }
}

exports.consultarEmbalagens = async function (event, context) {
  try {
    let bd = JSON.parse(event.body);

    const { cpf_cnpj, limite, ultimaChave } = bd;

    if (ultimaChave) {
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
        const embalagens = dados.Items;
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
      console.log('Dados sem chave...'+ dados)
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
