import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../helpers/decorators';

import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
	constructor(readonly movieService: MovieService) {}

	@Get()
	async getAll() {
		return await this.movieService.findBy({});
	}

	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	async create(@Body() movieDto: MovieDto) {
		return await this.movieService.create(movieDto);
	}

	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put(':id')
	async update(@Param('id') id: number, @Body() movieDto: MovieDto) {
		return await this.movieService.update(id, movieDto);
	}

	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.movieService.delete(id);
	}
}
