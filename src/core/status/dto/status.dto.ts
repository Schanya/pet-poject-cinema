import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class StatusDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}
