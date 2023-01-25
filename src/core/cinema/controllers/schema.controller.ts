import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Request,
	Res,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Transaction } from 'sequelize';

import { TransactionInterceptor } from 'src/core/helpers/interceptors';
import { Roles, TransactionParam } from 'src/core/helpers/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/core/auth/guards';

import { AddToBasketDto, SchemaDto } from '../dto';

import { SchemaService } from '../services';

@Controller('schema')
export class SchemaController {
	constructor(readonly schemaService: SchemaService) {}

	@Roles('USER', 'ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(TransactionInterceptor)
	@Post('add-to-basket')
	async addToBasket(
		@Res() res: Response,
		@Request() req,
		@Body() addToBasketDto: AddToBasketDto,
		@TransactionParam() transaction: Transaction,
	) {
		const tikets = await this.schemaService.addToBasket(
			addToBasketDto,
			req.user.id,
			transaction,
		);
		res
			.status(HttpStatus.OK)
			.send({ message: 'Tickets added to cart', tikets });
	}

	@Get()
	async getAll(@Res() res: Response) {
		const schemas = await this.schemaService.findAll({});

		res.status(HttpStatus.OK).send(schemas);
	}

	@Post()
	async create(@Body() schemaDto: SchemaDto, @Res() res: Response) {
		const schema = await this.schemaService.create(schemaDto);

		res
			.status(HttpStatus.OK)
			.send({ message: 'Schema created successfully', schema });
	}

	@Put(':id')
	async update(
		@Param('id') id: number,
		@Body() schemaDto: SchemaDto,
		@Res() res: Response,
	) {
		const updatedSchema = await this.schemaService.update(id, schemaDto);

		res
			.status(HttpStatus.OK)
			.send({ message: 'Schema updated successfully', updatedSchema });
	}

	@Delete(':id')
	async delete(@Param('id') id: string, @Res() res: Response) {
		await this.schemaService.delete(id);

		res.status(HttpStatus.OK).send({ message: 'Schema deleted successfully' });
	}
}
