import { IsNumber, IsString } from 'class-validator';

export class EmpresaCreateDTO {
  @IsString()
  logoUrl: string;

  @IsNumber()
  userCreated: number;
}

export class EmpresaUpdateDTO {
  @IsNumber()
  id: number;

  @IsString()
  logoUrl: string;

  @IsNumber()
  userUpdated: number;
}
