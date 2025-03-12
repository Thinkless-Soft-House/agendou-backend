import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import ChatController from '../controllers/chat.controller';
import { SendMessageDTO } from '../dtos/chat.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';

class ChatRoute implements Routes {
  public path = '/chat/';
  public router = Router();
  public chatController = new ChatController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}send-message`,
      validationMiddleware(SendMessageDTO, 'body'),
      this.chatController.sendMessage
    );
  }
}

export default ChatRoute;