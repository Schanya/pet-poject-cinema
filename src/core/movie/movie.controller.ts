import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';

import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
	constructor(readonly movieService: MovieService) {}

	@Get()
	async getAll() {
		return await this.movieService.findBy({});
	}

	@Post()
	async create(@Body() movieDto: MovieDto) {
		return await this.movieService.create(movieDto);
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() movieDto: MovieDto) {
		return await this.movieService.update(id, movieDto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.movieService.delete(id);
	}
}
