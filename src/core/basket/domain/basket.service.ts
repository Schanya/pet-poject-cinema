import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

import { BasketDto, BasketOptions } from '../presentation/basket.dto';
import { Basket } from './basket.entity';

@Injectable()
export class BasketService {
	constructor(@InjectModel(Basket) private basketRepository: typeof Basket) {}

	public async findBy(options: BasketOptions): Promise<Basket> {
		const suitableBasket = await this.basketRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableBasket;
	}

	public async create(
		basketDto: BasketDto,
		transaction: Transaction,
	): Promise<Basket> {
		const createdBasket = await this.basketRepository.create(basketDto, {
			transaction,
		});

		return createdBasket;
	}
}
