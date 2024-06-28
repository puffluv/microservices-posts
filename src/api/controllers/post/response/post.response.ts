import { IPost } from '@lib/post';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class PostResponse implements Omit<IPost, 'isPublished'> {
  @ApiProperty({
    description: 'Идентификатор поста',
    type: 'string',
    example: uuidv4(),
  })
  id: string;

  @ApiProperty({ description: 'Заголовок поста', type: 'string' })
  title: string;

  @ApiProperty({ description: 'Сообщение поста', type: 'string' })
  message: string;

  @ApiProperty({
    description: 'Идентификатор автора сообщения',
    type: 'string',
    example: uuidv4(),
  })
  authorId: string;

  @ApiProperty({
    description: 'Дата создания поста',
    type: 'string',
    example: new Date().toISOString(),
  })
  createdAt: string;

  @ApiProperty({
    description: 'Дата обновление поста',
    type: 'string',
    example: new Date().toISOString(),
  })
  updatedAt: string;
}
