import { DomainError } from '@lib/errors';
import { Exclude } from 'class-transformer';
import { IsUUID, validateSync } from 'class-validator';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IPost } from './post.interface';
import { PostServices } from './services';
import { v4 as uuidv4 } from 'uuid';

export class PostAggregate extends PostServices implements IPost {
  @IsUUID()
  id: string = uuidv4();

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsUUID()
  @IsNotEmpty()
  authorId: string;

  @IsBoolean()
  @Exclude()
  isPublished = false;

  @IsString()
  createdAt = new Date().toISOString();

  @IsString()
  updatedAt = new Date().toISOString();

  private constructor() {
    super();
  }

  static create(post: Partial<IPost>) {
    const _post = new PostAggregate();
    Object.assign(_post, post);

    // Generate UUID for id if not provided
    _post.id = _post.id || uuidv4();

    // Generate UUID for authorId if not provided
    _post.authorId = _post.authorId || uuidv4();

    _post.updatedAt = post?.id ? new Date().toISOString() : _post.updatedAt;

    const errors = validateSync(_post);
    if (errors.length > 0) {
      console.error(errors); // Вывод ошибок в консоль для отладки
      throw new DomainError(errors, 'Post not valid');
    }
    return _post;
  }
}
