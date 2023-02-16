const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const aportePublico = null;

function trabalhaAporte(DadosAportes) {
  return new Promise(function (resolve, reject) {
    try {
      resolve(DadosAportes);
    } catch (err) {
      reject(err);
    }
  });
}

function trabalhaBaixa(DadosBaixas) {
  return new Promise(function (resolve, reject) {
    try {
      resolve(DadosBaixas);
    } catch (err) {
      reject(err);
    }
  });
}

function calculaFinal(DadosCalculo) {
  return new Promise(function (resolve, reject) {
    try {
      resolve(DadosCalculo);
    } catch (err) {
      reject(err);
    }
  });
}

async function getAporte(parametros) {
  try {
    const data = await dynamodb
      .query(parametros)
      .promise()
      .then((dados) => {
        this.aportePublico = dados;
        return dados;
      });
  } catch (err) {
    console.log(err);
    return err;
  }
}
async function soma(aportes, baixas) {
  let totalEstoque = 0;
  let descProduto = "";
  let descEmbalagem = "";
  let descUnidade = "";

  await aportes.forEach((element) => {
    console.log('Somando Unidade.. ' + element.descUnidade);
    descProduto = element.descProduto;
    descEmbalagem = element.descEmbalagem;
    totalEstoque += element.quantidade;
    descUnidade = element.descUnidade;
  });
  await baixas.forEach((element) => {
    console.log('Subtraindo Unidade.. ' + element.descUnidade);
    descProduto = element.descProduto;
    descEmbalagem = element.descEmbalagem;
    totalEstoque += element.quantidade;
    descUnidade = element.descUnidade;
  });
  
  console.log('Total em Estoque... '+totalEstoque)
  
  return {
    totalEmEstoque: totalEstoque,
    descProduto: descProduto,
    descEmbalagem: descEmbalagem,
    descUnidade: descUnidade
  }
}

async function getBaixa(parametros) {
  try {
    const data = await dynamodb.query(parametros).promise();
    return data;
  } catch (err) {
    return err;
  }
}

async function getFinal(DadosAportes, DadosBaixas) {
  try {
    const aportesJson = JSON.stringify(this.aportePublico.Items);
    const objAporte = JSON.parse(aportesJson);

    const baixasJson = JSON.stringify(DadosBaixas.Items);
    const objBaixa = JSON.parse(baixasJson);

    let res = "";
    await soma(objAporte, objBaixa).then((resultado) => {
      res = resultado;
    });
    console.log("Resultado final....");

    console.log(res);

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}

exports.relEstoque = async function (event, context) {
  try {
    const parametros = JSON.stringify(event.pathParameters);

    const chaveSk = JSON.parse(parametros).chave;
    const cpfCnpj = JSON.parse(parametros).cpf_cnpj;

    console.log('Chave SK... ' + chaveSk);
    console.log('cpfCnpj... ' + cpfCnpj);
    
    const paramsBaixa = {
      TableName: "BAIXA",
      KeyConditionExpression: "cpf_cnpj = :pk and begins_with(chave, :sk)",
      ExpressionAttributeValues: {
        ":pk": cpfCnpj,
        ":sk": chaveSk + "|",
      },
    };

    const paramsAporte = {
      TableName: "APORTE",
      KeyConditionExpression: "cpf_cnpj = :pk and begins_with(chave, :sk)",
      ExpressionAttributeValues: {
        ":pk": cpfCnpj,
        ":sk": chaveSk + "|",
      },
    };

    const DadosAportes = await getAporte(paramsAporte).then((dadosAporte) => {
      return dadosAporte;
    });

    const DadosBaixas = await getBaixa(paramsBaixa).then((dadosBaixa) => {
      return dadosBaixa;
    });

    const DadosCalculo = await getFinal(DadosAportes, DadosBaixas).then(
      (resultadoFinal) => {
        return resultadoFinal;
      }
    );

 

    return {
      statusCode: 200,
      body:  JSON.stringify(
        (await trabalhaAporte(DadosAportes)
          .then(function () {
            return trabalhaBaixa(DadosBaixas);
          })
          .then(function () {
            return calculaFinal(DadosCalculo);
          })),null,2

      ),
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
