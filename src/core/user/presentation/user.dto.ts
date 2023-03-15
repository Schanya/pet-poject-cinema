import {
	IsEmail,
	IsString,
	IsNotEmpty,
	MaxLength,
	IsInt,
	IsOptional,
} from 'class-validator';

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

export class UserOptions {
	@IsOptional()
	@IsInt()
	id?: number;

	@IsOptional()
	@MaxLength(255)
	@IsEmail()
	@IsString()
	email?: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	password?: string;
}
