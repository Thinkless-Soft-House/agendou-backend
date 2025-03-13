import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { WhatsAppProvider } from '../enums/provider.enum';

export class SendMessageDTO {
  provider: WhatsAppProvider;
  connectionId?: number;
  keyConexao?: string;
  number: string;
  content: string;
  openTicket?: boolean;
  closeTicket?: boolean;
}