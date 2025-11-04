import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  CreateTranslate,
  PageType,
  TranslateService,
  transData,
} from './translate.service';
import { ErrorResponse } from 'src/common/base';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('translate')
@UseGuards(AuthGuard)
export class TranslateController extends ErrorResponse {
  constructor(private readonly service: TranslateService) {
    super();
  }

  @Get('list')
  async get(@Body() dto: PageType) {
    const data = await this.service.get(dto);
    return this.tryError({
      list: data.list,
      total: data.total,
      currentPage: dto.pageNo,
      pageSize: dto.pageSize,
      totalPage: data.totalPage,
    });
  }

  @Post('create')
  async create(@Body() dto: CreateTranslate[]) {
    const data = await this.service.create([transData(dto)]);
    return this.tryError(data);
  }

  @Post('delete')
  async delete(@Body() dto: CreateTranslate) {
    const data = await this.service.delete(dto);
    return this.tryError(data);
  }

  @Post('update')
  async update(@Body() dto: CreateTranslate) {
    const data = await this.service.update(transData(dto));
    return this.tryError(data);
  }
}
