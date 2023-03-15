import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';

import { MovieController } from './application/movie.controller';
import { Movie } from './domain/movie.entity';
import { MovieService } from './domain/movie.service';

@Module({
	imports: [SequelizeModule.forFeature([Movie]), forwardRef(() => AuthModule)],
	controllers: [MovieController],
	providers: [MovieService],
	exports: [MovieService],
})
export class MovieModule {}
