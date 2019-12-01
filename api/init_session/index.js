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
    const req = await assistantClient.createSession({
      assistantId: process.env.ASSISTANT_ID,
    });

    const { status, result: { session_id: sessionId } } = req || {};

    if (status === 201 && sessionId) {
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          sessionId,
        }),
      };
    } else {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          message: 'Erro ao criar seção',
        }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: 'Erro ao criar seção',
      }),
    };
  }
};