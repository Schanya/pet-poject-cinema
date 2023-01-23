import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsDefined, IsInt } from 'class-validator';

export class TicketDto {
	@IsDefined()
	@IsInt({ each: true })
	@Transform((schemaId) => Number(schemaId))
	schemaId: number;

	@IsDefined()
	@IsInt({ each: true })
	@Transform((acheduleId) => Number(acheduleId))
	acheduleId: number;
}
