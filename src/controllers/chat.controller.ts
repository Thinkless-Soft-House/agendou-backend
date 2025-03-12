// src/controllers/chat.controller.ts
import { Request, Response } from 'express';
import axios from 'axios';
import { SendMessageDTO } from '../dtos/chat.dto';

class ChatController {
  public sendMessage = async (req: Request, res: Response) => {
    try {
      const messageData: SendMessageDTO = req.body;
      
      const response = await axios.post(
        'https://rest.botflex.com.br/api/v1/chat/send-message/integration',
        messageData,
        {
          headers: {
            'x-integration-token': process.env.BOTFLEX_TOKEN,
            'Content-Type': 'application/json',
            'Cookie': 'session=value'
          }
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error in sendMessage:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || 'Failed to send message'
      });
    }
  };
}

export default ChatController;