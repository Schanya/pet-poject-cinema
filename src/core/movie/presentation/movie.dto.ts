import {
	IsString,
	IsNotEmpty,
	MaxLength,
	IsNumber,
	IsInt,
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

export class MovieOptions {
	@IsInt()
	id?: number;

	@MaxLength(255)
	@IsString()
	name?: string;

	@IsString()
	discription?: string;

	@IsNumber()
	duuration?: number;
}
