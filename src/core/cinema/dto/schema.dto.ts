import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsDefined, IsInt } from 'class-validator';

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
