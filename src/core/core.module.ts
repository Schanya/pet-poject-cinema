import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HallModule } from './hall/hall.module';
import { MovieModule } from './movie/movie.module';
import { RoleModule } from './role/role.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SchemaModule } from './schema/schema.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';
import { StatusModule } from './status/status.module';

@Module({
	imports: [
		RoleModule,
		UserModule,
		AuthModule,
		MovieModule,
		HallModule,
		SchemaModule,
		ScheduleModule,
		TicketModule,
		StatusModule,
	],
})
export class CoreModule {}
