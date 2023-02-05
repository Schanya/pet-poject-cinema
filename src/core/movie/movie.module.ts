import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef } from '@nestjs/common/utils';

import { AuthModule } from '../auth/auth.module';

import { Movie } from './domain/movie.entity';
import { MovieController } from './application/movie.controller';
import { MovieService } from './domain/movie.service';

@Module({
	imports: [SequelizeModule.forFeature([Movie]), forwardRef(() => AuthModule)],
	controllers: [MovieController],
	providers: [MovieService],
	exports: [MovieService],
})
export class MovieModule {}
