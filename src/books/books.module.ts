import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { BookResolver } from './book.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookResolver, BooksService],
})
export class BooksModule {}
