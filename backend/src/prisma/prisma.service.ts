import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: process.env.DATABASE_HOST || 'localhost',
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME || 'ureeka-db',
      port: Number(process.env.DATABASE_PORT) || 3306,
      connectionLimit: 5,
    });
    super({ adapter });
  }
}
