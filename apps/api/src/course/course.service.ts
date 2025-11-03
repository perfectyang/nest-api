import { users, course_type, course_class } from '../db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { eq } from 'drizzle-orm';

export class CreateCourseDto {
  id: number;
  name: string;
  description: string;
  category: string;
  tags: string;
  language: string;
  languageCategory: string;
  url: string;
  length: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CourseEntity {
  name: string;
  password: string;
}

@Injectable()
export class CourseService {
  constructor(@Inject(DB) private db: DbType) {}

  async createCourse(dto: CreateCourseDto[]) {
    const [res] = await this.db.insert(course_type).values(dto);
    return {
      id: res.insertId,
    };
  }

  async getCourseClass(course_id: number) {
    const res = await this.db.query.course_class.findMany({
      with: {},
      columns: {
        id: true,
        name: true,
        ukphone: true,
        usphone: true,
        trans: true,
        course_id: true,
        createdAt: true,
        updatedAt: true,
      },
      where: eq(course_class.course_id, course_id),
    });
    return res;
  }

  async findName(dto: CreateCourseDto) {
    return this.db.query.course_type.findFirst({
      where: eq(course_type.id, dto.id),
    });
  }

  async getCourse() {
    const res = await this.db.query.course_type.findMany({
      with: {},
      columns: {
        id: true,
        name: true,
        description: true,
        category: true,
        tags: true,
        language: true,
        languageCategory: true,
        url: true,
        length: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res;
  }
}
