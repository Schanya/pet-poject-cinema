import {
	IsEmail,
	IsString,
	IsNotEmpty,
	MaxLength,
	IsNumber,
} from 'class-validator';

export class MovieDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;

	@IsString()
	discription?: string;

	@IsNotEmpty()
	@IsNumber()
	duuration: number;
}
