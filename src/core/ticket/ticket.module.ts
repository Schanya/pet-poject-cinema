import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { Ticket } from './domain/ticket.entity';
import { TicketController } from './application/ticket.controller';
import { TicketService } from './domain/ticket.service';

@Module({
	imports: [SequelizeModule.forFeature([Ticket]), forwardRef(() => AuthModule)],
	controllers: [TicketController],
	providers: [TicketService],
	exports: [TicketService],
})
export class TicketModule {}
