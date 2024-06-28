import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostResponse, PaginatedPosts } from '../responses';
import { PostFacade } from '@lib/post/application-services';
import { PaginationDto } from '@lib/shared';
import { plainToInstance } from 'class-transformer';
import { Public } from '@lib/auth';
import { v4 as uuidv4 } from 'uuid';
import { CreatePostInput, UpdatePostInput } from '../inputs';

@Resolver(() => PostResponse)
export class PostResolver {
  constructor(private readonly postFacade: PostFacade) {}

  @Query(() => PostResponse, { name: 'post' })
  async getPostById(@Args('id') id: string) {
    return this.postFacade.queries.getOnePost(id);
  }

  @Public()
  @Query(() => PaginatedPosts, { name: 'posts' })
  async getPosts(@Args() paginationDto: PaginationDto) {
    const pagination = plainToInstance(PaginationDto, paginationDto);
    // @ts-ignore
    const [data, total] = await this.postFacade.queries.getAllPosts(pagination);
    return {
      ...pagination,
      data,
      total,
    };
  }

  @Mutation(() => PostResponse)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postFacade.commands.createPost({
      ...createPostInput,
      authorId: uuidv4(),
    });
  }

  @Mutation(() => PostResponse)
  async updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postFacade.commands.updatePost({
      ...updatePostInput,
      authorId: uuidv4(),
    });
  }

  @Mutation(() => PostResponse)
  async setPublishedPost(@Args('id') id: string) {
    return this.postFacade.commands.setPublished(id);
  }
}
