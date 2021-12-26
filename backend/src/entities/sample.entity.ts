import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  property1: string;

  @Column()
  property2: string;
}
