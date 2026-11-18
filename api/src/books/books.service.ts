import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const genre = await this.prisma.genre.findUnique({
      where: { id: createBookDto.genreId },
    });
    if (!genre) {
      throw new NotFoundException(`Genre with ID "${createBookDto.genreId}" not found`);
    }

    const existingIsbn = await this.prisma.book.findUnique({
      where: { isbn: createBookDto.isbn },
    });
    if (existingIsbn) {
      throw new ConflictException(`Book with ISBN "${createBookDto.isbn}" already exists`);
    }

    const totalCopies = createBookDto.totalCopies ?? 1;

    return this.prisma.book.create({
      data: {
        title: createBookDto.title,
        author: createBookDto.author,
        isbn: createBookDto.isbn,
        description: createBookDto.description,
        publishedYear: createBookDto.publishedYear,
        totalCopies: totalCopies,
        copiesAvailable: totalCopies,
        genreId: createBookDto.genreId,
      },
      include: {
        genre: true,
      },
    });
  }

  async findAll(
    genreId?: string,
    search?: string,
    page?: number | string,
    limit?: number | string,
  ) {
    const where: Prisma.BookWhereInput = {};

    if (genreId) {
      where.genreId = genreId;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ];
    }

    const pageNum = page ? Math.max(1, Number(page)) : 1;
    const limitNum = limit ? Math.max(1, Number(limit)) : 10;
    const skip = (pageNum - 1) * limitNum;
    const take = limitNum;

    const [data, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip,
        take,
        include: {
          genre: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    };
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        genre: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }

    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.findOne(id);

    if (updateBookDto.genreId) {
      const genre = await this.prisma.genre.findUnique({
        where: { id: updateBookDto.genreId },
      });
      if (!genre) {
        throw new NotFoundException(`Genre with ID "${updateBookDto.genreId}" not found`);
      }
    }

    if (updateBookDto.isbn) {
      const existingIsbn = await this.prisma.book.findUnique({
        where: { isbn: updateBookDto.isbn },
      });
      if (existingIsbn && existingIsbn.id !== id) {
        throw new ConflictException(`Book with ISBN "${updateBookDto.isbn}" already exists`);
      }
    }

    const data: any = { ...updateBookDto };
    if (updateBookDto.totalCopies !== undefined) {
      data.totalCopies = updateBookDto.totalCopies;
      data.copiesAvailable = updateBookDto.totalCopies;
    }

    return this.prisma.book.update({
      where: { id },
      data,
      include: {
        genre: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.book.delete({
      where: { id },
    });
  }
}
