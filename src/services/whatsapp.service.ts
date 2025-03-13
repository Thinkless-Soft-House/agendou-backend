// src/services/whatsapp.service.ts
import axios from 'axios';
import { Empresa } from '@/interfaces/empresa.interface';

class WhatsAppService {
  async sendConfirmation(user: any, message: string) {
    try {
      // Acessa a empresa através do usuário
      const empresa = await user.empresa; // Supondo que existe relação user->empresa
      
      if (!empresa) throw new Error('Empresa não encontrada');
      
      const provider = empresa.EMP_PROVIDER;
      const phone = user.pessoa.telefone; // Remove não dígitos

      // Configurações fixas (coloque seus dados reais aqui)
      const config = {
        1: { // WhatsApp Atende
          url: 'https://api11.whatsatende.com.br/api/messages/send',
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_ATENDE_TOKEN}`,
            'Content-Type': 'application/json'
          },
          data: {
            number: phone,
            body: message,
            closeTicket: false
          }
        },
        2: { // BotFlex
          url: 'https://rest.botflex.com.br/api/v1/chat/send-message/integration',
          headers: {
            'x-integration-token': process.env.BOTFLEX_TOKEN,
            'Content-Type': 'application/json'
          },
          data: {
            connectionId: process.env.BOTFLEX_CONNECTION_ID,
            messageType: "conversation",
            content: message,
            number: phone,
            openTicket: false
          }
        }
      };

      const response = await axios.post(
        config[provider].url,
        config[provider].data,
        { headers: config[provider].headers }
      );

      return response.data;
      
    } catch (error) {
      console.error('Erro no WhatsApp:', error.response?.data || error.message);
      throw new Error('Falha ao enviar mensagem');
    }
  }
}

export default new WhatsAppService();