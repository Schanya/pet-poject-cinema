import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Res,
	UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard, RolesGuard } from '../../auth/guards';
import { Roles } from '../../helpers/decorators';

import { MovieDto } from '../dto/movie.dto';
import { MovieService } from '../services/movie.service';

@Controller('movie')
export class MovieController {
	constructor(readonly movieService: MovieService) {}

	@Get()
	async getAll(@Res() res: Response) {
		const movies = await this.movieService.findAll({});

		res.status(HttpStatus.OK).send(movies);
	}

	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	async create(@Body() movieDto: MovieDto, @Res() res: Response) {
		const movie = await this.movieService.create(movieDto);

		res.status(HttpStatus.OK).send(`Movie ${movie.name} created successfully`);
	}

	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Put(':id')
	async update(
		@Param('id') id: number,
		@Body() movieDto: MovieDto,
		@Res() res: Response,
	) {
		const updatedMovie = await this.movieService.update(id, movieDto);

		res
			.status(HttpStatus.OK)
			.send(`Movie ${updatedMovie.name} updated successfully`);
	}

	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	async delete(@Param('id') id: string, @Res() res: Response) {
		await this.movieService.delete(id);

		res.status(HttpStatus.OK).send(`Movie deleted successfully`);
	}
}
