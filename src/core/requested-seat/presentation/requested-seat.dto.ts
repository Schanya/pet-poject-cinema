import { Transform } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';

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
	@IsInt()
	id?: number;

	@IsInt({ each: true })
	@Transform((schemaId) => Number(schemaId))
	schemaId?: number;

	@IsInt({ each: true })
	@Transform((scheduleId) => Number(scheduleId))
	scheduleId?: number;

	@IsInt({ each: true })
	@Transform((scheduleId) => Number(scheduleId))
	userId?: number;
}
