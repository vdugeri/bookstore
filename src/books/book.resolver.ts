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
    return this.bookService.findAll();
  }

  @Mutation((returns) => Book)
  async addBook(@Args('bookRequest') bookRequest: BookRequest): Promise<Book> {
    const book = await this.bookService.create(bookRequest);
    pubSub.publish('bookAdded', { bookAdded: book });
    return book;
  }

  @Mutation((returns) => Boolean)
  async removeBook(@Args('id') id: number) {
    return this.bookService.removeBook(id);
  }

  @Subscription((returns) => Book)
  bookAdded() {
    return pubSub.asyncIterator('bookAdded');
  }
}
