import {
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class HallDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}

export class HallOptions {
	@IsOptional()
	@IsInt()
	id?: number;

	@IsOptional()
	@MaxLength(255)
	@IsString()
	name?: string;
}
