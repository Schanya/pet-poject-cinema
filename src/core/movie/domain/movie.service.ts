import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { MovieDto, MovieOptions } from '../presentation/movie.dto';
import { Movie } from './movie.entity';

import * as fs from 'fs';
import { ReadAllResult } from 'src/common/types/read-all-result.type';

@Injectable()
export class MovieService {
	constructor(@InjectModel(Movie) private movieRepository: typeof Movie) {}

	public async findAll(options: MovieOptions): Promise<ReadAllResult<Movie>> {
		const { count, rows } = await this.movieRepository.findAndCountAll({
			where: { ...options },
			include: { all: true },
		});

		return {
			totalRecordsNumber: count,
			entities: rows,
		};
	}

	public async findBy(options: MovieOptions): Promise<Movie> {
		const suitableMovie = await this.movieRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableMovie;
	}

	public async create(movieDto: MovieDto, filePath: string): Promise<Movie> {
		const existingMovie = await this.findBy({ name: movieDto.name });

		if (existingMovie) {
			throw new BadRequestException('Such movie has already exist');
		}

		return await this.movieRepository.create({ ...movieDto, url: filePath });
	}

	public async update(
		id: number,
		movieDto: MovieDto,
		filePath?: string,
	): Promise<Movie> {
		const movie = await this.findBy({ id: id });

		if (!movie) {
			throw new BadRequestException("Such movie doesn't exist");
		}

		const existingMovie = await this.findBy({ name: movieDto.name });

		if (existingMovie) {
			throw new BadRequestException('Such movie has already exist');
		}

		if (fs.existsSync(movie.url)) {
			fs.unlink(movie.url, () => {});
		}

		await this.movieRepository.update(
			{ ...movieDto, url: filePath },
			{ where: { id } },
		);

		const updatedMovie = await this.findBy({ id: id });

		return updatedMovie;
	}

	public async delete(id: number): Promise<number> {
		const movie = await this.findBy({ id: id });

		if (fs.existsSync(movie.url)) {
			fs.unlink(movie.url, () => {});
		}

		const numberDeletedRows = await this.movieRepository.destroy({
			where: { id },
		});

		return numberDeletedRows;
	}
}
