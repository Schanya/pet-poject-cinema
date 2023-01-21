import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { Ticket } from './ticket.entity';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
	imports: [SequelizeModule.forFeature([Ticket]), forwardRef(() => AuthModule)],
	controllers: [TicketController],
	providers: [TicketService],
	exports: [TicketService],
})
export class TicketModule {}
