import { Transform } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';

export class BasketDto {
	@IsDefined()
	@IsInt({ each: true })
	@Transform((statusId) => Number(statusId))
	statusId: number;

	@IsDefined()
	@IsInt({ each: true })
	@Transform((ticketId) => Number(ticketId))
	ticketId: number;

	@IsDefined()
	@IsInt({ each: true })
	@Transform((userId) => Number(userId))
	userId: number;
}
