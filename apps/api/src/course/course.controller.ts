import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCourseDto, CourseService } from './course.service';
import { cet } from './CET6_T';

@Controller('api/course')
export class CourseController {
  constructor(private readonly userService: CourseService) {}

  @Post('add')
  add(@Body() dto: CreateCourseDto[]) {
    return this.userService.createCourse(dto);
  }

  @Get('get')
  get() {
    return this.userService.getCourse();
  }

  @Post('getAll')
  getAll(@Body() courseInfo: { course_id: number }) {
    return this.userService.getCourseClass(courseInfo.course_id);
  }
}
