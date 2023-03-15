import { Transform } from 'class-transformer';
import {
	IsNotEmpty,
	IsNumber,
	IsDefined,
	IsInt,
	IsOptional,
} from 'class-validator';

export class SchemaDto {
	@IsNotEmpty()
	@IsNumber()
	place: number;

	@IsNotEmpty()
	@IsNumber()
	row: number;

	@IsDefined()
	@IsInt({ each: true })
	@Transform((hallId) => Number(hallId))
	hallId: number;
}

export class AddToBasketDto {
	@IsDefined()
	@IsInt({ each: true })
	@Transform((hallId) => Number(hallId))
	hallId: number;

	@IsDefined()
	@IsInt({ each: true })
	@Transform((scheduleId) => Number(scheduleId))
	scheduleId: number;
}

export class SchemaOptions {
	@IsOptional()
	@IsInt()
	id?: number;

	@IsOptional()
	@IsNumber()
	place?: number;

	@IsOptional()
	@IsNumber()
	row?: number;

	@IsOptional()
	@IsInt({ each: true })
	@Transform((hallId) => Number(hallId))
	hallId?: number;
}
