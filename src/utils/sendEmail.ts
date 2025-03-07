import { HttpException } from '@/exceptions/HttpException';
import axios from 'axios';
import { bookingClientTemplate } from './templates/booking-client';
import { bookingCompanyTemplate } from './templates/booking-company';
import { codeVerificationTemplate } from './templates/code-verification';
import { generateReportTemplate } from './templates/generate-report';
import { Recipient, EmailParams, MailerSend, Sender } from "mailersend";
const AWS_SES_URL = process.env.URL_LAMBDA;

const generateIcsContent = (eventDetails: {
  title: string;
  startDateTime: Date;
  endDateTime: Date;
  description?: string;
  location?: string;
}) => {
  const formatDate = (date: Date) => 
    date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Collegato//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@collegato.com`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(eventDetails.startDateTime)}`,
    `DTEND:${formatDate(eventDetails.endDateTime)}`,
    `SUMMARY:${eventDetails.title}`,
    `DESCRIPTION:${eventDetails.description || ''}`,
    `LOCATION:${eventDetails.location || ''}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Lembrete',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
};

export interface EmailTemplateData {
  [key: string]: string;
}

export enum EmailTemplateType {
  // Auto provided
  REQUEST_TEMPLATE = 'request-template',
  DYNAMIC = 'dynamic',
}

export interface EmailFrom {
  name: string;
  prefix: string;
}

export interface EmailData {
  fromName?: EmailFrom;
  destination: string;
  subject: string;

  templateType: string;
  template?: string;
  templateData?: EmailTemplateData;
}

export const sendForgotPasswordEmail = async (email: string, code: number) => {
  const templateWithCode = codeVerificationTemplate.replace('{{CODE}}', code.toString());
  const url = AWS_SES_URL + '/email/send';
  console.log('url ses', url);
  try {
    const { data } = await axios.post(url, {
      destination: email,
      templateType: EmailTemplateType.REQUEST_TEMPLATE,
      template: templateWithCode,
      subject: 'Recuperação de senha - Collegato',
      fromName: {
        name: 'Collegato',
        prefix: 'noreply',
      },
    } as EmailData);

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
  const apiKey = "mlsn.8ad9ae17d39f29487b63d079312644fb0fde0a861fe98a2f001f7532f929e6b4"; // Substitua pela sua chave de API
  const url = "https://api.mailersend.com/v1/email";

  const emailData = {
    from: {
      email: "noreply@thinkless.com.br", // Remetente configurado na MailerSend
      name: "Collegato",              // Nome do remetente
    },
    to: [
      {
        email: email,
        name: "Recipient", // Nome do destinatário (opcional)
      },
    ],
    subject: "Relatório de uso - Collegato",
    html: `Relatório disponível no link: <a href="${path}">Clique aqui</a>`, // Conteúdo HTML
    text: `Relatório disponível no link: ${path}`, // Conteúdo texto simples
  };

  try {
    const response = await axios.post(url, emailData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Email enviado com sucesso:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao enviar email:", error);

    if (error.response) {
      throw new Error(
        `Erro com dados da resposta: ${JSON.stringify(error.response.data)}`
      );
    } else if (error.request) {
      throw new Error("Sem resposta da MailerSend");
    } else {
      throw new Error(`Erro desconhecido: ${error.message}`);
    }
  }
};
export const sendUserCreatedEmail = async (email: string, nome: string) => {
  const apiKey = "mlsn.8ad9ae17d39f29487b63d079312644fb0fde0a861fe98a2f001f7532f929e6b4"; // Substitua pela sua chave de API
  const url = "https://api.mailersend.com/v1/email";

  const emailData = {
    from: {
      email: "noreply@thinkless.com.br", // Remetente configurado na MailerSend
      name: "Collegato",              // Nome do remetente
    },
    to: [
      {
        email: email,
        name: "Recipient", // Nome do destinatário (opcional)
      },
    ],
    subject: "Usuário criado - Collegato",
    html: `Parabens ${nome}, seu usuário foi criado com sucesso.`, // Conteúdo HTML
    text: `Parabens ${nome}, seu usuário foi criado com sucesso.`, // Conteúdo texto simples
  };

  try {
    const response = await axios.post(url, emailData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Email enviado com sucesso:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao enviar email:", error);

    if (error.response) {
      throw new Error(
        `Erro com dados da resposta: ${JSON.stringify(error.response.data)}`
      );
    } else if (error.request) {
      throw new Error("Sem resposta da MailerSend");
    } else {
      throw new Error(`Erro desconhecido: ${error.message}`);
    }
  }
};
export const sendBookingClientEmail = async (email: string, empresa: string) => {
  const apiKey = "mlsn.8ad9ae17d39f29487b63d079312644fb0fde0a861fe98a2f001f7532f929e6b4"; // Substitua pela sua chave de API
  const url = "https://api.mailersend.com/v1/email";

  const emailData = {
    from: {
      email: "noreply@thinkless.com.br", // Remetente configurado na MailerSend
      name: "Collegato",              // Nome do remetente
    },
    to: [
      {
        email: email,
        name: "Recipient", // Nome do destinatário (opcional)
      },
    ],
    subject: "Reserva realizada - Collegato",
    html: `Reserva na sala ${empresa} realizada com sucesso para a data solicitada!`, // Conteúdo HTML
    text: `Reserva na sala ${empresa} realizada com sucesso para a data solicitada!`, // Conteúdo texto simples
  };

  try {
    const response = await axios.post(url, emailData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Email enviado com sucesso:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao enviar email:", error);

    if (error.response) {
      throw new Error(
        `Erro com dados da resposta: ${JSON.stringify(error.response.data)}`
      );
    } else if (error.request) {
      throw new Error("Sem resposta da MailerSend");
    } else {
      throw new Error(`Erro desconhecido: ${error.message}`);
    }
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
  const url = AWS_SES_URL + '/email/send';
  console.log('url ses', url);
  try {
    const { data } = await axios.post(url, {
      destination: email,
      templateType: EmailTemplateType.REQUEST_TEMPLATE,
      template: templateWithCode,
      subject: 'Nova reserva - Collegato',
      fromName: {
        name: 'Collegato',
        prefix: 'noreply',
      },
    } as EmailData);

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

export const sendAppointmentConfirmationEmail = async (
  email: string,
  eventDetails: {
    title: string;
    startDateTime: Date;
    endDateTime: Date;
    description?: string;
    location?: string;
  }
) => {
  const apiKey = "mlsn.8ad9ae17d39f29487b63d079312644fb0fde0a861fe98a2f001f7532f929e6b4";
  const url = "https://api.mailersend.com/v1/email";

  // Gera o conteúdo ICS
  const icsContent = generateIcsContent(eventDetails);
  
  // Converte para Base64
  const icsBase64 = Buffer.from(icsContent).toString('base64');

  const emailData = {
    from: {
      email: "noreply@thinkless.com.br",
      name: "Collegato"
    },
    to: [{ email }],
    subject: `Confirmação de Agendamento: ${eventDetails.title}`,
    html: `
      <h1>Agendamento Confirmado!</h1>
      <p><strong>Evento:</strong> ${eventDetails.title}</p>
      <p><strong>Data:</strong> ${eventDetails.startDateTime.toLocaleDateString()}</p>
      <p><strong>Horário:</strong> ${eventDetails.startDateTime.toLocaleTimeString()} às ${eventDetails.endDateTime.toLocaleTimeString()}</p>
      <p>O anexo ICS foi incluído para você adicionar à sua agenda.</p>
    `,
    text: `
      Agendamento Confirmado!
      Evento: ${eventDetails.title}
      Data: ${eventDetails.startDateTime.toLocaleDateString()}
      Horário: ${eventDetails.startDateTime.toLocaleTimeString()} às ${eventDetails.endDateTime.toLocaleTimeString()}
      O anexo ICS foi incluído para você adicionar à sua agenda.
    `,
    attachments: [
      {
        content: icsBase64,
        filename: 'agendamento-collegato.ics',
        type: 'text/calendar; method=REQUEST; charset=UTF-8'
      }
    ]
  };

  try {
    const response = await axios.post(url, emailData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('E-mail com ICS enviado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao enviar:', error.response?.data || error.message);
    throw new Error('Falha no envio do e-mail com ICS');
  }
};
