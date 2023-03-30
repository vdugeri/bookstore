import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { NotFoundException } from '@nestjs/common';
import { BookArgs } from './dto/book.args';
import { BookRequest } from './dto/book.request';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver((of) => Book)
export class BookResolver {
  constructor(private readonly bookService: BooksService) {}

  @Query((returns) => Book)
  async book(@Args('id') id: number): Promise<Book> {
    const book: Book = await this.bookService.findOneById(id);

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }

  @Query((returns) => [Book])
  async books(@Args() bookArgs: BookArgs): Promise<Book[]> {
    return await this.bookService.findAll(bookArgs);
  }

  @Mutation((returns) => Book)
  async addBook(@Args('bookRequest') bookRequest: BookRequest): Promise<Book> {
    const book = await this.bookService.create(bookRequest);
    pubSub.publish('bookAdded', { bookAdded: book });
    return book;
  }

  @Mutation((returns) => Book)
  async editBook(
    @Args('bookRequest') bookRequest: BookRequest,
    @Args('id') id: number,
  ) {
    const book = await this.bookService.editBook(id, bookRequest);
    pubSub.publish('bookEdited', { bookEdited: book });

    return book;
  }

  @Mutation((returns) => Boolean)
  async removeBook(@Args('id') id: number): Promise<boolean> {
    return this.bookService.removeBook(id);
  }

  @Subscription((returns) => Book)
  bookAdded() {
    return pubSub.asyncIterator('bookAdded');
  }

  @Subscription((returns) => Book)
  bookEdited() {
    return pubSub.asyncIterator('bookEdited');
  }
}
