import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('generals')
export class AppController {
  @Get('is-alive')
  public isAlive(): boolean {
    return true;
  }
}
