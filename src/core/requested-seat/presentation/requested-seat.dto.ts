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
