import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateLanguage, LanguageService } from './language.service';
import { ErrorResponse } from 'src/common/base';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('language')
@UseGuards(AuthGuard)
export class LanguageController extends ErrorResponse {
  constructor(private readonly service: LanguageService) {
    super();
  }

  @Get('list')
  async get() {
    const data = await this.service.get();
    return this.tryError({
      list: data,
    });
  }

  @Post('create')
  async create(@Body() dto: CreateLanguage) {
    const data = await this.service.create(dto);
    return this.tryError(data);
  }

  @Post('delete')
  async delete(@Body() dto: CreateLanguage) {
    const data = await this.service.delete(dto);
    return this.tryError(data);
  }

  @Post('update')
  async update(@Body() dto: CreateLanguage) {
    const data = await this.service.update(dto);
    return this.tryError(data);
  }
}
