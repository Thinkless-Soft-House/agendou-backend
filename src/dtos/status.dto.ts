import { IsNumber, IsString } from 'class-validator';

export class StatusCreateDTO {
  @IsString()
  tipo: string;
}

export class StatusUpdateDTO {
  @IsNumber()
  id: number;

  @IsString()
  tipo: string;
}
