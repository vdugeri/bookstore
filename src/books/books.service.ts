import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { BookRequest } from './dto/book.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}
  async findOneById(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async create(bookRequest: BookRequest): Promise<Book> {
    const book = new Book();

    book.description = bookRequest.description;
    book.name = bookRequest.name;

    return this.bookRepository.save(book);
  }

  async removeBook(id: number) {
    return this.bookRepository.delete(id);
  }
}
