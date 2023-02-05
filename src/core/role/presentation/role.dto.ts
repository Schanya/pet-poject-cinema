import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class RoleDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}
