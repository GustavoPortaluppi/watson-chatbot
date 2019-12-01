const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true };

const assistantClient = new AssistantV2({
  authenticator: new IamAuthenticator({ apikey: process.env.API_KEY }),
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-09-19'
});

exports.handler = async (event) => {
  try {
    /* Receber parâmetros de entrada via body */
    const parsedBody = (event.body) ? JSON.parse(event.body) : {};
    const { sessionId, message } = parsedBody;

    const req = await assistantClient.message({
      input: { text: message },
      assistantId: process.env.ASSISTANT_ID,
      sessionId,
    });

    const { status, result: { output } } = req;

    if (status === 200 && output) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(output),
      };
    } else {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          message: 'Erro ao processar mensagem',
        }),
      };
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: 'Erro ao processar mensagem',
      }),
    };
  }
};