import { IsEmail, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class MovieDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsEmail()
	@IsString()
	name: string;

	@IsString()
	discription?: string;
}
