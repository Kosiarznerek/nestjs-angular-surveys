import { SampleCreate } from 'common';
import { IsNotEmpty, IsString } from 'class-validator';

export class SampleCreateDto implements SampleCreate {
  @IsString()
  @IsNotEmpty()
  public property1: string;

  @IsString()
  @IsNotEmpty()
  public property2: string;
}
