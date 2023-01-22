import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { SchemaDto } from './dto/schema.dto';
import { Schema } from './schema.entity';

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
		const schema = await this.schemaRepository.create(schemaDto);

		return schema;
	}

	public async update(id: number, schemaDto: SchemaDto): Promise<Schema> {
		await this.schemaRepository.update(schemaDto, { where: { id } });

		return await this.findBy({ id: id });
	}

	public async delete(id: string): Promise<any> {
		return await this.schemaRepository.destroy({ where: { id } });
	}
}
