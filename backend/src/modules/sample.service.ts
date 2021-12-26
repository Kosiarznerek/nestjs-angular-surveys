import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SampleEntity } from '../entities/sample.entity';
import { Sample, SampleCreate } from 'common';

@Injectable()
export class SampleService {
  public constructor(
    @InjectRepository(SampleEntity)
    private readonly sampleEntityRepository: Repository<SampleEntity>,
  ) {}

  public find(): Promise<Sample[]> {
    return this.sampleEntityRepository.find();
  }

  public findOne(id: number): Promise<Sample> {
    return this.sampleEntityRepository.findOne(id);
  }

  public insert(model: SampleCreate): Promise<Sample> {
    return this.sampleEntityRepository.save(model);
  }
}
