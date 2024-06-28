import { PostFacade } from '@lib/post/application-services';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { CurrentUser, ICurrentUser, Public } from '@lib/auth';
import { v4 as uuidv4 } from 'uuid';
import { JwtGuard } from '@lib/auth/guards/jwt.guard';
import { PaginationDto } from '@lib/shared/dto';
import { plainToInstance } from 'class-transformer';
import { ApiOkResponsePaginated, ReponseWithPagination } from '@lib/shared';
import { PostAggregate } from '@lib/post';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostResponse } from './response';

@ApiTags('Posts')
// @UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postFacade: PostFacade) {}

  @ApiOperation({
    summary: 'Создание поста',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostResponse })
  @Post()
  createPost(
    @CurrentUser() user: ICurrentUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postFacade.commands.createPost({
      ...createPostDto,
      authorId: uuidv4(),
      // authorId: user.userId,
    });
  }

  @ApiOperation({
    summary: 'Получение поста по его идентификатору',
  })
  @ApiOkResponse({ type: PostResponse })
  @Public()
  @Get(':id')
  getPostById(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.queries.getOnePost(id);
  }

  @ApiOperation({
    summary: 'Получение всех постов',
  })
  @ApiOkResponsePaginated(PostResponse)
  @Public()
  @Get()
  async getAllPosts(
    @Query() paginationDto: PaginationDto,
  ): Promise<ReponseWithPagination<PostAggregate>> {
    const pagination = plainToInstance(PaginationDto, paginationDto);
    // @ts-ignore
    const [data, count] = await this.postFacade.queries.getAllPosts(pagination);
    return {
      ...pagination,
      data,
      total: count,
    };
  }

  @ApiOperation({
    summary: 'Обновление поста',
  })
  @ApiOkResponse({ type: PostResponse })
  @Put()
  updatePost(
    @CurrentUser() user: ICurrentUser,
    @Body() updatePost: UpdatePostDto,
  ) {
    return this.postFacade.commands.updatePost({
      ...updatePost,
      authorId: uuidv4(),
      // authorId: user.userId,
    });
  }

  @ApiOperation({
    summary: 'Установка флага "Опубликован" в значении true',
  })
  @ApiOkResponse({ type: PostResponse })
  @Patch(`:id`)
  setPublished(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.setPublished(id);
  }

  @ApiOperation({
    summary: 'Удаление поста',
  })
  @ApiOkResponse({ type: Boolean })
  @Delete(':id')
  deletePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.deletePost(id);
  }
}
