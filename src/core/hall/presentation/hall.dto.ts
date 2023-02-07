import {
	IsEmail,
	IsString,
	IsNotEmpty,
	MaxLength,
	IsInt,
} from 'class-validator';

export class HallDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}

export class HallOptions {
	@IsInt()
	id?: number;

	@MaxLength(255)
	@IsString()
	name?: string;
}
