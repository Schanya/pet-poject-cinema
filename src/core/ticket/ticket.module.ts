import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';
import { RequestedSeat } from '../requested-seat/requested-seat.entity';
import { Basket } from '../basket/basket.entity';

import { Ticket } from './ticket.entity';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
	imports: [
		SequelizeModule.forFeature([Ticket, RequestedSeat, Basket]),
		forwardRef(() => AuthModule),
	],
	controllers: [TicketController],
	providers: [TicketService],
	exports: [TicketService],
})
export class TicketModule {}
