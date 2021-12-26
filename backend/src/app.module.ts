import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { SampleModule } from './modules/sample.module';

@Module({
  controllers: [AppController],
  imports: [TypeOrmModule.forRoot(), SampleModule],
})
export class AppModule {}
