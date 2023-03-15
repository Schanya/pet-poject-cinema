import {
	IsString,
	IsNotEmpty,
	MaxLength,
	IsInt,
	IsOptional,
} from 'class-validator';

export class RoleDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;
}

export class RoleOptions {
	@IsOptional()
	@IsInt()
	id?: number;

	@IsOptional()
	@MaxLength(255)
	@IsString()
	name?: string;
}
