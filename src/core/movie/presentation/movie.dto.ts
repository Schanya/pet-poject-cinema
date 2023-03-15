import {
	IsString,
	IsNotEmpty,
	MaxLength,
	IsNumber,
	IsInt,
	IsOptional,
} from 'class-validator';

export class MovieDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	discription?: string;

	@IsNotEmpty()
	@IsNumber()
	duration: number;
}

export class MovieOptions {
	@IsOptional()
	@IsInt()
	id?: number;

	@IsOptional()
	@MaxLength(255)
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	discription?: string;

	@IsOptional()
	@IsNumber()
	duration?: number;
}
