import {
	BadRequestException,
	Injectable,
	UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { SchemaDto } from '../dto/schema.dto';
import { Schema } from '../entities/schema.entity';

@Injectable()
export class SchemaService {
	constructor(@InjectModel(Schema) private schemaRepository: typeof Schema) {}

	public async findBy(options: any): Promise<Schema> {
		return await this.schemaRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(schemaDto: SchemaDto): Promise<Schema> {
		const existingRowInSchema = await this.findBy({ row: schemaDto.row });

		if (existingRowInSchema) {
			throw new BadRequestException('Such row in schema has already exist');
		}

		return await this.schemaRepository.create(schemaDto);
	}

	public async update(id: number, schemaDto: SchemaDto): Promise<Schema> {
		const schema = await this.findBy({ id: id });

		if (!schema) {
			throw new BadRequestException("Such schema doesn't exist");
		}

		const existingRowInSchema = await this.findBy({ row: schemaDto.row });

		if (existingRowInSchema) {
			throw new BadRequestException('Such row in schema has already exist');
		}

		await this.schemaRepository.update(schemaDto, { where: { id } });

		return await this.findBy({ id: id });
	}

	public async delete(id: string): Promise<any> {
		return await this.schemaRepository.destroy({ where: { id } });
	}
}
