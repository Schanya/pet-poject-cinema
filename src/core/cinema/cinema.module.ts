import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';

import {
	Basket,
	Hall,
	Movie,
	RequestedSeat,
	Schedule,
	Schema,
	Status,
	Ticket,
} from './entities';
import {
	HallController,
	MovieController,
	ScheduleController,
	SchemaController,
	StatusController,
	TicketController,
} from './controllers';
import {
	HallService,
	MovieService,
	ScheduleService,
	SchemaService,
	StatusService,
	TicketService,
} from './services';

@Module({
	imports: [
		SequelizeModule.forFeature([
			Basket,
			Hall,
			Movie,
			RequestedSeat,
			Schedule,
			Schema,
			Status,
			Ticket,
		]),
		forwardRef(() => AuthModule),
	],
	controllers: [
		HallController,
		MovieController,
		ScheduleController,
		SchemaController,
		StatusController,
		TicketController,
	],
	providers: [
		HallService,
		MovieService,
		ScheduleService,
		SchemaService,
		StatusService,
		TicketService,
	],
	exports: [
		HallService,
		MovieService,
		ScheduleService,
		SchemaService,
		StatusService,
		TicketService,
	],
})
export class CinemaModule {}
