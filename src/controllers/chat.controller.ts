// src/controllers/chat.controller.ts
import { Request, Response } from 'express';
import WhatsAppService from '../services/whatsapp.service';
import { SendMessageDTO } from '../dtos/chat.dto';

class ChatController {

  public sendMessage = async (req: Request, res: Response) => {
    try {
      const messageData: SendMessageDTO = req.body;
      

      
      res.status(200).json('result');
    } catch (error) {
      console.error('Error in sendMessage:', error.message);
      res.status(500).json({
        error: error.message || 'Failed to send message'
      });
    }
  };
}

export default ChatController;