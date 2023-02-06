import { Transform } from 'class-transformer';
import {
	IsDefined,
	IsInt,
	IsNotEmpty,
	IsNumber,
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
	@Transform((movieId) => Number(movieId))
	movieId: number;
}

export class RoomOptions {
	@IsInt()
	id?: number;

	@MaxLength(255)
	@IsString()
	name?: string;

	@IsNumber()
	numberOfUsers?: number;

	@IsInt({ each: true })
	@Transform((movieId) => Number(movieId))
	movieId?: number;
}
