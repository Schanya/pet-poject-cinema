import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReadAllResult } from 'src/common/types/read-all-result.type';

import { StatusDto, StatusOptions } from '../presentation/status.dto';
import { Status } from './status.entity';

@Injectable()
export class StatusService {
	constructor(@InjectModel(Status) private statusRepository: typeof Status) {}

	public async findAll(options: StatusOptions): Promise<ReadAllResult<Status>> {
		const { count, rows } = await this.statusRepository.findAndCountAll({
			where: { ...options },
			include: { all: true },
		});

		return {
			totalRecordsNumber: count,
			entities: rows,
		};
	}

	public async findBy(options: StatusOptions): Promise<Status> {
		const suitableStatus = await this.statusRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableStatus;
	}

	public async create(statusDto: StatusDto): Promise<Status> {
		const existingStatus = await this.findBy({ name: statusDto.name });

		if (existingStatus) {
			throw new BadRequestException('Such status has already exist');
		}

		const createdStatus = await this.statusRepository.create(statusDto);

		return createdStatus;
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

		const updatedStatus = await this.findBy({ id: id });

		return updatedStatus;
	}

	public async delete(id: string): Promise<number> {
		const numberOfDeletedRows = await this.statusRepository.destroy({
			where: { id },
		});

		return numberOfDeletedRows;
	}
}
