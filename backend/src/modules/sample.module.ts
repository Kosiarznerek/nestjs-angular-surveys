import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleEntity } from '../entities/sample.entity';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';

@Module({
  controllers: [SampleController],
  providers: [SampleService],
  imports: [TypeOrmModule.forFeature([SampleEntity])],
})
export class SampleModule {}
