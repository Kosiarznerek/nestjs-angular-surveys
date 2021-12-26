import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { SurveysModule } from './modules/surveys.module';

@Module({
  controllers: [AppController],
  imports: [TypeOrmModule.forRoot(), SurveysModule],
})
export class AppModule {}
