import { Type } from 'class-transformer';
import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
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
	@Type(() => Number)
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
