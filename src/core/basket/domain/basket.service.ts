import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

import { BasketDto } from '../presentation/basket.dto';
import { Basket } from './basket.entity';

@Injectable()
export class BasketService {
	constructor(@InjectModel(Basket) private basketRepository: typeof Basket) {}

	public async findBy(options: any): Promise<Basket> {
		const basket = await this.basketRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return basket;
	}

	public async create(
		basketDto: BasketDto,
		transaction: Transaction,
	): Promise<Basket> {
		const newBasket = await this.basketRepository.create(basketDto, {
			transaction,
		});

		return newBasket;
	}
}
