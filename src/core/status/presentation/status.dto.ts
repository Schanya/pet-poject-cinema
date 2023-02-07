import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class StatusDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}

export class StatusOptions {
	@IsInt()
	id?: number;

	@MaxLength(255)
	@IsString()
	name?: string;
}
