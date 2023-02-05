import { Transform } from 'class-transformer';
import {
	IsDefined,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsString,
	MaxLength,
} from 'class-validator';
import { Min } from 'sequelize-typescript';

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
