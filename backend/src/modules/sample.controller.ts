import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SampleCreateDto } from '../dtos/sample-create.dto';
import { SampleDto } from '../dtos/sample.dto';
import { SampleService } from './sample.service';

@ApiTags('sample')
@Controller('sample')
export class SampleController {
  public constructor(private readonly sampleService: SampleService) {}

  @Get()
  public find(): Promise<SampleDto[]> {
    return this.sampleService.find();
  }

  @Get(':id')
  public findOne(@Param(':id') id: number): Promise<SampleDto> {
    return this.sampleService.findOne(id);
  }

  @Post()
  public insert(@Body() model: SampleCreateDto): Promise<SampleDto> {
    return this.sampleService.insert(model);
  }
}
