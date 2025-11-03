import { language } from '../db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';

export class CreateLanguage {
  language: string;
  description: string;
  id: number;
}

@Injectable()
export class LanguageService {
  constructor(@Inject(DB) private db: DbType) {}

  async get() {
    const res = await this.db.query.language.findMany({
      with: {},
      // columns: {
      //   id: true,
      //   projectName: true,
      // },
    });
    return res;
  }

  async create(dto: CreateLanguage) {
    const [res] = await this.db.insert(language).values({
      ...dto,
    });
    return {
      id: res.insertId,
    };
  }

  async update(dto: CreateLanguage) {
    const [res] = await this.db
      .update(language)
      .set({
        ...dto,
      })
      .where(eq(language.id, dto.id));
    return res;
  }

  async delete(dto: CreateLanguage) {
    const res = await this.db.delete(language).where(eq(language.id, dto.id));
    return res;
  }
}
