import { IsEmail } from 'class-validator';

export interface User {
  id: string;
  email: string;
}

export class CreateUserDto {
  @IsEmail()
  email: string;
}
