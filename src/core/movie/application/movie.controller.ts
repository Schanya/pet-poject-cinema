import {
	Body,
	Controller,
	Delete,
	Get,
	Header,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Redirect,
	StreamableFile,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { ReadAllResult } from 'src/common/types/read-all-result.type';
import { MulterUtils } from 'src/configs/multer-module-options.config';
import { UploadTypesEnum } from 'src/core/helpers/upload-types.enum';
import { JwtAuthGuard, RolesGuard } from '../../auth/guards';
import { Roles } from '../../helpers/decorators';
import { Movie } from '../domain/movie.entity';

import { MovieService } from '../domain/movie.service';
import { MovieDto } from '../presentation/movie.dto';

@Controller('movie')
export class MovieController {
	constructor(readonly movieService: MovieService) {}

	@Get('/getFile')
	@Redirect('/index.html', 301)
	redirect() {}

	@HttpCode(HttpStatus.OK)
	@Get('/file/:id')
	@Header('Content-Type', 'video/mp4')
	async getFile(@Param('id') id: number): Promise<StreamableFile> {
		const suitableMovie = await this.movieService.findBy({ id });

		const file = createReadStream(suitableMovie.url);

		return new StreamableFile(file);
	}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll(): Promise<ReadAllResult<Movie>> {
		const movies = await this.movieService.findAll({});

		return {
			totalRecordsNumber: movies.totalRecordsNumber,
			entities: movies.entities,
		};
	}

	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(
		FileInterceptor('file', MulterUtils.getConfig(UploadTypesEnum.VIDEO)),
	)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(
		@UploadedFile()
		file: Express.Multer.File,
		@Body() movieDto: MovieDto,
	) {
		const movie = await this.movieService.create(movieDto, file.path);

		return movie;
	}

	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(
		FileInterceptor('file', MulterUtils.getConfig(UploadTypesEnum.VIDEO)),
	)
	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(
		@Param('id')
		id: number,
		@Body() movieDto: MovieDto,
		@UploadedFile()
		file?: Express.Multer.File,
	) {
		const updatedMovie = await this.movieService.update(
			id,
			movieDto,
			file.path,
		);

		return updatedMovie;
	}

	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: number) {
		await this.movieService.delete(id);

		return `Movie deleted successfully`;
	}
}
