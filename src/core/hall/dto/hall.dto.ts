import { IsEmail, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class HallDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}
