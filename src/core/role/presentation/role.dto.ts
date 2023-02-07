import { IsString, IsNotEmpty, MaxLength, IsInt } from 'class-validator';

export class RoleDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}

export class RoleOptions {
	@IsInt()
	id?: number;

	@MaxLength(255)
	@IsString()
	name?: string;
}
