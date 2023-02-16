const AWS = require("aws-sdk");
fs = require("fs");
axios = require("axios");
fetch = require("node-fetch");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const arrLinks = [];
objetos = [];

function preencheLinks(arrUnidades, parametro) {
  return new Promise(function (resolve, reject) {
    try {
      //console.log('Listando os links...')
      resolve(
        arrUnidades.forEach((element) => {
          arrLinks.push({
            link:
              "https://2gem0p8ebl.execute-api.sa-east-1.amazonaws.com/relEstoque/" +
              parametro.cpfCnpj +
              "/" +
              element.idUnidade +
              "|" +
              parametro.idProduto,
          });
        })
      );
    } catch (err) {
      reject(err);
    }
  });
}

async function preencheObjeto(link){
 // console.log('Recebendo o link...')
  //console.log(link);

  await axios.get(
    'https://2gem0p8ebl.execute-api.sa-east-1.amazonaws.com/relEstoque/00900164751/1|1'
  )
  .then((dados) => {
    console.log('Retorno da consulta...')
    console.log(dados);
    /* objetos.push(JSON.parse(dados.data));
   if (dados.data.descProduto != "") {
      objetos.push(dados.data);

      console.log(objetos);

      fs.writeFileSync("./objetos.json", JSON.stringify(objetos), {
        encoding: "utf-8",
      });
    }*/
   
  });
}


async function criaObjeto() {
 //console.log('Criando objetos');
  arrLinks.forEach((element) => {
    preencheObjeto(element.link)
  })
 
}


function lerObjeto() {
  return new Promise(function (resolve, reject) {
    try {
      resolve(
        JSON.parse(
          JSON.stringify(
            fs.readFileSync("./objetos.json", { encoding: "utf-8" })
          )
        )
      );
    } catch (err) {
      reject(err);
    }
  });
}

async function getUnidade(parametros) {
  try {
    const data = await dynamodb.query(parametros).promise();
    return data;
  } catch (err) {
    return err;
  }
}
exports.consultaEstoqueGeral = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.pathParameters);
    const cpfCnpjParametro = JSON.parse(parametros).cpf_cnpj;
    const idProduto = JSON.parse(parametros).idProduto;

    var paramsLinks = {
      idProduto: idProduto,
      cpfCnpj: cpfCnpjParametro,
    };
    var params = {
      TableName: "UNID_VENDA",
      KeyConditionExpression: "#p1 = :valorP1",
      ExpressionAttributeNames: { "#p1": "cpf_cnpj" },
      ExpressionAttributeValues: { ":valorP1": cpfCnpjParametro },
    };

    const dados = await getUnidade(params);

    if (dados.Count == 0) {
      return {
        statusCode: 404,
        body: JSON.stringify(
          { error: "Unidade de venda não encontrada" },
          null,
          2
        ),
      };
    }
    const unidades = dados.Items;
    
    await preencheLinks(unidades,paramsLinks ).then(()=>{
      criaObjeto().then(()=>{
        return lerObjeto;
      })
    })

    

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
