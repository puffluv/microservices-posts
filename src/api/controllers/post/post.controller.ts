import { PostFacade } from '@lib/post/application-services';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto';
import { CurrentUser, ICurrentUser } from '@lib/auth';
import { v4 as uuidv4 } from 'uuid';
import { JwtGuard } from '@lib/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postFacade: PostFacade) {}

  @Post()
  createPost(
    @CurrentUser() user: ICurrentUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postFacade.commands.createPost({
      ...createPostDto,
      authorId: user.userId,
    });
  }
}
