import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { BookRequest } from './dto/book.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookArgs } from './dto/book.args';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async findOneById(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async findAll(bookArgs: BookArgs): Promise<Book[]> {
    const { skip, take }: BookArgs = bookArgs;
    return this.bookRepository.find({
      skip,
      take,
    });
  }

  async create(bookRequest: BookRequest): Promise<Book> {
    const book = new Book();

    book.description = bookRequest.description;
    book.name = bookRequest.name;

    return this.bookRepository.save(book);
  }

  async removeBook(id: number): Promise<boolean> {
    await this.bookRepository.delete(id);
    return true;
  }

  async editBook(id: number, bookRequest: BookRequest): Promise<Book> {
    let book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      book = new Book();
    }

    book.name = bookRequest.name;
    book.description = bookRequest.description;

    return this.bookRepository.save(book);
  }
}
