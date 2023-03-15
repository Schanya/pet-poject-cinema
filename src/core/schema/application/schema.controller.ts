import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Request,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { Transaction } from 'sequelize';

import { JwtAuthGuard, RolesGuard } from 'src/core/auth/guards';
import { Roles, TransactionParam } from 'src/core/helpers/decorators';
import { TransactionInterceptor } from 'src/core/helpers/interceptors';

import { ReadAllResult } from 'src/common/types/read-all-result.type';
import { Schema } from '../domain/schema.entity';
import { SchemaService } from '../domain/schema.service';
import { AddToBasketDto, SchemaDto } from '../presentation/schema.dto';

@Controller('schema')
export class SchemaController {
	constructor(readonly schemaService: SchemaService) {}

	@Roles('USER', 'ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(TransactionInterceptor)
	@HttpCode(HttpStatus.OK)
	@Post('add-to-basket')
	async addToBasket(
		@Request() req,
		@Body() addToBasketDto: AddToBasketDto,
		@TransactionParam() transaction: Transaction,
	) {
		const tikets = await this.schemaService.addToBasket(
			addToBasketDto,
			req.user.id,
			transaction,
		);

		return tikets;
	}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll(): Promise<ReadAllResult<Schema>> {
		const schemas = await this.schemaService.findAll({});

		return {
			totalRecordsNumber: schemas.totalRecordsNumber,
			entities: schemas.entities,
		};
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() schemaDto: SchemaDto) {
		const schema = await this.schemaService.create(schemaDto);

		return schema;
	}

	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(@Param('id') id: number, @Body() schemaDto: SchemaDto) {
		const updatedSchema = await this.schemaService.update(id, schemaDto);

		return updatedSchema;
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		await this.schemaService.delete(id);

		return 'Schema deleted successfully';
	}
}
