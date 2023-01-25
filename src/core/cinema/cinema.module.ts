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
	RequestedSeatController,
	ScheduleController,
	SchemaController,
	StatusController,
	TicketController,
} from './controllers';
import {
	HallService,
	MovieService,
	RequestedSeatService,
	ScheduleService,
	SchemaService,
	StatusService,
	TicketService,
} from './services';
import { UserModule } from '../user/user.module';

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
		UserModule,
	],
	controllers: [
		HallController,
		MovieController,
		ScheduleController,
		SchemaController,
		StatusController,
		TicketController,
		RequestedSeatController,
	],
	providers: [
		HallService,
		MovieService,
		ScheduleService,
		SchemaService,
		StatusService,
		TicketService,
		RequestedSeatService,
	],
	exports: [
		HallService,
		MovieService,
		ScheduleService,
		SchemaService,
		StatusService,
		TicketService,
		RequestedSeatService,
	],
})
export class CinemaModule {}
