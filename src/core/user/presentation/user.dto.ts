import {
	IsEmail,
	IsString,
	IsNotEmpty,
	MaxLength,
	IsInt,
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
	@IsInt()
	id?: number;

	@MaxLength(255)
	@IsEmail()
	@IsString()
	email?: string;

	@IsNotEmpty()
	@IsString()
	password?: string;
}
