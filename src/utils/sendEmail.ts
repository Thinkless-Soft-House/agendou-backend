import { HttpException } from '@/exceptions/HttpException';
import axios from 'axios';
import { codeVerificationTemplate } from './templates/code-verification';
const AWS_SES_URL = process.env.URL_LAMBDA;

export const sendForgotPasswordEmail = async (email: string, code: number) => {
  const templateWithCode = codeVerificationTemplate.replace('{{CODE}}', code.toString());
  const url = AWS_SES_URL + '/sendSingleEmail';
  console.log('url ses', url);
  try {
    const { data } = await axios.post(url, {
      destination: email,
      template: templateWithCode,
      subject: 'Recuperação de senha - Collegato',
    });

    return data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      throw new HttpException(error.response.data, 'error with data');
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      throw new HttpException(500, 'Sem resposta do SES');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      throw new HttpException(500, error.message);
    }
    console.log(error.config);
    throw new HttpException(4500, 'Unknown Error');
  }
};
