import { IsEmail, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UserDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsEmail()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}
