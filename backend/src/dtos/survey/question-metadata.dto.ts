import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { DateQuestionMetadataDto } from './date-question-metadata.dto';
import { NumberQuestionMetadataDto } from './number-question-metadata.dto';
import { SelectQuestionMetadataDto } from './select-question-metadata.dto';
import { TextQuestionMetadataDto } from './text-question-metadata.dto';

export type QuestionMetadataDto =
  | TextQuestionMetadataDto
  | NumberQuestionMetadataDto
  | DateQuestionMetadataDto
  | SelectQuestionMetadataDto;

export const QuestionMetadataApiExtraModels = () =>
  ApiExtraModels(
    TextQuestionMetadataDto,
    NumberQuestionMetadataDto,
    DateQuestionMetadataDto,
    SelectQuestionMetadataDto,
  );

export const QuestionMetadataApiProperty = () =>
  ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(TextQuestionMetadataDto) },
      { $ref: getSchemaPath(NumberQuestionMetadataDto) },
      { $ref: getSchemaPath(DateQuestionMetadataDto) },
      { $ref: getSchemaPath(SelectQuestionMetadataDto) },
    ],
  });
