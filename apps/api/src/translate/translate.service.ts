import { translate, user } from '../db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { eq, sql } from 'drizzle-orm';
import * as argon2 from 'argon2';

export class CreateTranslate {
  key: string;
  translations: Record<string, string>;
  description: string;
  id: number;
  creator_id: number;
  project_id: number;
}

export const transData = (ob): CreateTranslate => {
  const translations = {
    key: ob.key,
    creator_id: Number(ob.creator_id),
    project_id: Number(ob.project_id),
    description: ob.description,
    translations: {},
    id: ob.id,
  };
  ob.translate.forEach((item, idx) => {
    translations.translations[item.language] = item.text;
  });
  return translations;
};

export class PageType {
  pageNo: number;
  pageSize: number;
}

@Injectable()
export class TranslateService {
  constructor(@Inject(DB) private db: DbType) {}

  async get(dto: PageType) {
    const whereClause = sql`name LIKE ${'%john%'}`;

    // 1. 获取总数
    const [{ total }] = await this.db
      .select({ total: sql<number>`count(*)` })
      .from(translate);

    const res = await this.db
      .select({
        id: translate.id,
        key: translate.key,
        project_id: translate.project_id,
        description: translate.description,
        translations: translate.translations,
        created_at: translate.created_at,
        updatedBy: user.user,
        creator_id: user.id,
      })
      .from(translate)
      .leftJoin(user, eq(user.id, translate.creator_id))
      .offset((dto.pageNo - 1) * dto.pageSize)
      .limit(dto.pageSize);

    const totalPages = Math.ceil(total / dto.pageSize);

    return {
      list: res,
      total: total,
      totalPage: totalPages,
    };
  }

  async create(dto: CreateTranslate[]) {
    const res = await this.db.insert(translate).values([...dto]);
    return res;
  }

  async update(dto: CreateTranslate) {
    const [res] = await this.db
      .update(translate)
      .set({
        ...dto,
      })
      .where(eq(translate.id, dto.id));
    return res;
  }

  async delete(dto: CreateTranslate) {
    const res = await this.db.delete(translate).where(eq(translate.id, dto.id));
    return res;
  }
}
