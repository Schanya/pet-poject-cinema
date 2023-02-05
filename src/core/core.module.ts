import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { MovieModule } from './movie/movie.module';
import { HallModule } from './hall/hall.module';
import { TicketModule } from './ticket/ticket.module';
import { SchemaModule } from './schema/schema.module';
import { ScheduleModule } from './schedule/schedule.module';
import { StatusModule } from './status/status.module';
import { RequestedSeatModule } from './requested-seat/requested-seat.module';
import { RoomModule } from './room/room.module';
import { BasketModule } from './basket/basket.module';

@Module({
	imports: [
		UserModule,
		AuthModule,
		RoleModule,
		MovieModule,
		HallModule,
		TicketModule,
		SchemaModule,
		ScheduleModule,
		StatusModule,
		RequestedSeatModule,
		RoomModule,
		BasketModule,
	],
})
export class CoreModule {}
