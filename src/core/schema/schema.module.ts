import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { Schema } from './domain/schema.entity';
import { SchemaController } from './application/schema.controller';
import { SchemaService } from './domain/schema.service';
import { RequestedSeatModule } from '../requested-seat/requested-seat.module';
import { TicketModule } from '../ticket/ticket.module';
import { UserModule } from '../user/user.module';
import { StatusModule } from '../status/status.module';
import { BasketModule } from '../basket/basket.module';

@Module({
	imports: [
		SequelizeModule.forFeature([Schema]),
		forwardRef(() => AuthModule),
		RequestedSeatModule,
		TicketModule,
		UserModule,
		StatusModule,
		BasketModule,
	],
	controllers: [SchemaController],
	providers: [SchemaService],
	exports: [SchemaService],
})
export class SchemaModule {}
