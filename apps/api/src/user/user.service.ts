import { users } from '../db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';

export class CreateUserDto {
  name: string;
  password: string;
}

export class UserEntity {
  name: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(@Inject(DB) private db: DbType) {}

  async createUser(dto: CreateUserDto) {
    const [res] = await this.db.insert(users).values({
      ...dto,
      password: await argon2.hash(dto.password),
    });
    return {
      id: res.insertId,
    };
  }

  async getUser() {
    const res = await this.db.query.users.findMany({
      with: {},
      columns: {
        id: true,
        name: true,
      },
    });
    return res;
  }

  async findName(dto: CreateUserDto) {
    return this.db.query.users.findFirst({
      where: eq(users.name, dto.name),
    });
  }
}
