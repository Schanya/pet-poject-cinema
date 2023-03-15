import { Transform, Type } from 'class-transformer';
import {
	IsDefined,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class RoomDto {
	@IsNotEmpty()
	@MaxLength(255)
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsNumber()
	numberOfUsers: number;

	@IsDefined()
	@IsInt({ each: true })
	@Type(() => Number)
	movieId: number;
}

export class RoomOptions {
	@IsOptional()
	@IsInt()
	id?: number;

	@IsOptional()
	@MaxLength(255)
	@IsString()
	name?: string;

	@IsOptional()
	@IsNumber()
	numberOfUsers?: number;

	@IsOptional()
	@IsInt({ each: true })
	@Transform((movieId) => Number(movieId))
	movieId?: number;
}
