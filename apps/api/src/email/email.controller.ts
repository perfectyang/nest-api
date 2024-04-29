import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('api/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  login(@Body() dto: Record<string, any>) {
    return this.emailService.sendEmail(dto);
  }
}
