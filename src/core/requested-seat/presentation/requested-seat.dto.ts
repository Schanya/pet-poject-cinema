import { Transform } from 'class-transformer';
import { IsDefined, IsInt, IsOptional } from 'class-validator';

export class RequestedSeatDto {
	@IsDefined()
	@IsInt({ each: true })
	@Transform((schemaId) => Number(schemaId))
	schemaId: number;

	@IsDefined()
	@IsInt({ each: true })
	@Transform((scheduleId) => Number(scheduleId))
	scheduleId: number;
}

export class RequestedSeatOptions {
	@IsOptional()
	@IsInt()
	id?: number;

	@IsOptional()
	@IsInt({ each: true })
	@Transform((schemaId) => Number(schemaId))
	schemaId?: number;

	@IsOptional()
	@IsInt({ each: true })
	@Transform((scheduleId) => Number(scheduleId))
	scheduleId?: number;

	@IsOptional()
	@IsInt({ each: true })
	@Transform((scheduleId) => Number(scheduleId))
	userId?: number;
}
