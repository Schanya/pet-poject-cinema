import { Transform } from 'class-transformer';
import {
	IsNotEmpty,
	IsDefined,
	IsInt,
	IsDate,
	IsOptional,
} from 'class-validator';

export class ScheduleDto {
	@IsNotEmpty()
	@Transform(({ value }) => new Date(value))
	@IsDate()
	date: Date;

	@IsDefined()
	@IsInt({ each: true })
	@Transform((movieId) => Number(movieId))
	movieId: number;

	@IsDefined()
	@IsInt({ each: true })
	@Transform((hallId) => Number(hallId))
	hallId: number;
}

export class ScheduleOptions {
	@IsOptional()
	@IsInt()
	id?: number;

	@IsOptional()
	@Transform(({ value }) => new Date(value))
	@IsDate()
	date?: Date;

	@IsOptional()
	@IsInt({ each: true })
	@Transform((movieId) => Number(movieId))
	movieId?: number;

	@IsOptional()
	@IsInt({ each: true })
	@Transform((hallId) => Number(hallId))
	hallId?: number;
}
