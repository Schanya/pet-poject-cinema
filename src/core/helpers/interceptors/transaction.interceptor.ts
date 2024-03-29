import {
	CallHandler,
	ExecutionContext,
	HttpStatus,
	Inject,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
	constructor(
		@Inject('SEQUELIZE')
		private readonly sequelizeInstance: Sequelize,
	) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<any>> {
		const httpContext = context.switchToHttp();
		const req = httpContext.getRequest();
		const transaction: Transaction = await this.sequelizeInstance.transaction({
			logging: true,
		});
		req.transaction = transaction;
		return next.handle().pipe(
			tap(async () => {
				await transaction.commit();
			}),
			catchError(async (err) => {
				await transaction.rollback();
				const message =
					err instanceof HttpException ? err.message : 'Transaction rolback';
				const status =
					err instanceof HttpException
						? err.getStatus()
						: HttpStatus.INTERNAL_SERVER_ERROR;

				throw new HttpException(message, status);
			}),
		);
	}
}
