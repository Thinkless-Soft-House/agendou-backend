import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class SendMessageDTO {
  @IsNumber()
  connectionId: number;

  @IsString()
  messageType: string;

  @IsString()
  content: string;

  @IsString()
  number: string;

  @IsBoolean()
  openTicket: boolean;
}