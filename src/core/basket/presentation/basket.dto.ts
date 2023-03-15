import { Transform } from 'class-transformer';
import { IsDefined, IsInt, IsOptional } from 'class-validator';

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

export class BasketOptions {
	@IsOptional()
	@IsInt()
	id: number;

	@IsOptional()
	@IsInt({ each: true })
	@Transform((statusId) => Number(statusId))
	statusId?: number;

	@IsOptional()
	@IsInt({ each: true })
	@Transform((ticketId) => Number(ticketId))
	ticketId?: number;

	@IsOptional()
	@IsInt({ each: true })
	@Transform((userId) => Number(userId))
	userId?: number;
}
