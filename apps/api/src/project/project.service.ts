import { project } from '../db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '../global/providers/db.provider';
import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';

export class CreateProject {
  projectName: string;
  description: string;
  id: number;
}

@Injectable()
export class ProjectService {
  constructor(@Inject(DB) private db: DbType) {}

  async getProject() {
    const res = await this.db.query.project.findMany({
      with: {},
      // columns: {
      //   id: true,
      //   projectName: true,
      // },
    });
    return res;
  }

  async createProject(dto: CreateProject) {
    const [res] = await this.db.insert(project).values({
      ...dto,
    });
    return {
      id: res.insertId,
    };
  }

  async updateProject(dto: CreateProject) {
    const [res] = await this.db
      .update(project)
      .set({
        ...dto,
      })
      .where(eq(project.id, dto.id));
    return res;
  }

  async delteProject(dto: CreateProject) {
    const res = await this.db.delete(project).where(eq(project.id, dto.id));
    return res;
  }
}
