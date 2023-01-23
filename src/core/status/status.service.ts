import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StatusDto } from './dto/status.dto';
import { Status } from './status.entity';

@Injectable()
export class StatusService {
	constructor(@InjectModel(Status) private statusRepository: typeof Status) {}

	public async findBy(options: any): Promise<Status> {
		return await this.statusRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(statusDto: StatusDto): Promise<Status> {
		const existingStatus = await this.findBy({ name: statusDto.name });

		if (existingStatus) {
			throw new BadRequestException('Such status has already exist');
		}

		return await this.statusRepository.create(statusDto);
	}

	public async update(id: number, statusDto: StatusDto): Promise<Status> {
		const status = await this.findBy({ id: id });

		if (!status) {
			throw new BadRequestException("Such status doesn't exist");
		}

		const existingStatus = await this.findBy({ name: statusDto.name });

		if (existingStatus) {
			throw new BadRequestException('Such status has already exist');
		}

		await this.statusRepository.update(statusDto, { where: { id } });

		return await this.findBy({ id: id });
	}

	public async delete(id: string): Promise<any> {
		return await this.statusRepository.destroy({ where: { id } });
	}
}
