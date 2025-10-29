import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateProject, ProjectService } from './project.service';
import { ErrorResponse } from 'src/common/base';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController extends ErrorResponse {
  constructor(private readonly service: ProjectService) {
    super();
  }

  @Get('list')
  async getProject() {
    const data = await this.service.getProject();
    return this.tryError({
      list: data,
    });
  }

  @Post('create')
  async createProject(@Body() dto: CreateProject) {
    const data = await this.service.createProject(dto);
    return this.tryError(data);
  }

  @Post('delete')
  async deleteProject(@Body() dto: CreateProject) {
    const data = await this.service.delteProject(dto);
    return this.tryError(data);
  }

  @Post('update')
  async updateProject(@Body() dto: CreateProject) {
    const data = await this.service.updateProject(dto);
    return this.tryError(data);
  }
}
