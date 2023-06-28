import { HttpException } from '@/exceptions/HttpException';
import axios from 'axios';
import { bookingClientTemplate } from './templates/booking-client';
import { bookingCompanyTemplate } from './templates/booking-company';
import { codeVerificationTemplate } from './templates/code-verification';
import { generateReportTemplate } from './templates/generate-report';
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
export const sendGenerateReportEmail = async (email: string, path: string) => {
  const templateWithCode = generateReportTemplate.replace('{{URL}}', path);
  const url = AWS_SES_URL + '/sendSingleEmail';
  console.log('url ses', url);
  try {
    const { data } = await axios.post(url, {
      destination: email,
      template: templateWithCode,
      subject: 'Relatório gerado - Collegato',
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
export const sendBookingClientEmail = async (
  email: string,
  data: {
    company: string;
    room: string;
    date: string;
    hour: string;
  },
) => {
  const templateWithCode = bookingClientTemplate
    .replace('{{EMPRESA}}', data.company)
    .replace('{{EMPRESA}}', data.company)
    .replace('{{SALA}}', data.room)
    .replace('{{DIA}}', data.date)
    .replace('{{HORARIO}}', data.hour);
  const url = AWS_SES_URL + '/sendSingleEmail';
  console.log('url ses', url);
  try {
    const { data } = await axios.post(url, {
      destination: email,
      template: templateWithCode,
      subject: 'Confirmação de reserva - Collegato',
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

export const sendBookingCompanyEmail = async (
  email: string,
  data: {
    client: string;
    clientEmail: string;
    room: string;
    date: string;
    hour: string;
  },
) => {
  const templateWithCode = bookingCompanyTemplate
    .replace('{{CLIENTE}}', data.client.toString())
    .replace('{{CLIENTE}}', data.client.toString())
    .replace('{{EMAIL_CLIENTE}}', data.clientEmail.toString())
    .replace('{{SALA}}', data.room.toString())
    .replace('{{DIA}}', data.date.toString())
    .replace('{{HORARIO}}', data.hour.toString());
  const url = AWS_SES_URL + '/sendSingleEmail';
  console.log('url ses', url);
  try {
    const { data } = await axios.post(url, {
      destination: email,
      template: templateWithCode,
      subject: 'Confirmação de reserva - Collegato',
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
