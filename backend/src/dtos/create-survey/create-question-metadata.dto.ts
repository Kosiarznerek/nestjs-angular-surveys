import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { DiscriminatorDescriptor } from 'class-transformer';
import { QuestionMetadataType } from 'common';
import { CreateDateQuestionMetadataDto } from './create-date-question-metadata.dto';
import { CreateNumberQuestionMetadataDto } from './create-number-question-metadata.dto';
import { CreateSelectQuestionMetadataDto } from './create-select-question-metadata.dto';
import { CreateTextQuestionMetadataDto } from './create-text-question-metadata.dto';

export type CreateQuestionMetadataDto =
  | CreateTextQuestionMetadataDto
  | CreateNumberQuestionMetadataDto
  | CreateDateQuestionMetadataDto
  | CreateSelectQuestionMetadataDto;

export const CreateQuestionMetadataApiExtraModels = () =>
  ApiExtraModels(
    CreateTextQuestionMetadataDto,
    CreateNumberQuestionMetadataDto,
    CreateDateQuestionMetadataDto,
    CreateSelectQuestionMetadataDto,
  );

export const CreateQuestionMetadataApiProperty = () =>
  ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(CreateTextQuestionMetadataDto) },
      { $ref: getSchemaPath(CreateNumberQuestionMetadataDto) },
      { $ref: getSchemaPath(CreateDateQuestionMetadataDto) },
      { $ref: getSchemaPath(CreateSelectQuestionMetadataDto) },
    ],
  });

export const createQuestionMetadataDescriptor: DiscriminatorDescriptor = {
  property: 'type',
  subTypes: [
    {
      value: CreateTextQuestionMetadataDto,
      name: QuestionMetadataType.PlainText,
    },
    {
      value: CreateTextQuestionMetadataDto,
      name: QuestionMetadataType.EmailText,
    },
    {
      value: CreateTextQuestionMetadataDto,
      name: QuestionMetadataType.AreaText,
    },
    {
      value: CreateNumberQuestionMetadataDto,
      name: QuestionMetadataType.StandartNumber,
    },
    {
      value: CreateDateQuestionMetadataDto,
      name: QuestionMetadataType.DatePicker,
    },
    {
      value: CreateSelectQuestionMetadataDto,
      name: QuestionMetadataType.SingleSelectRadio,
    },
    {
      value: CreateSelectQuestionMetadataDto,
      name: QuestionMetadataType.SingleSelectCheckbox,
    },
    {
      value: CreateSelectQuestionMetadataDto,
      name: QuestionMetadataType.SingleSelectDropdown,
    },
    {
      value: CreateSelectQuestionMetadataDto,
      name: QuestionMetadataType.MultiSelectCheckbox,
    },
    {
      value: CreateSelectQuestionMetadataDto,
      name: QuestionMetadataType.MultiSelectDropdown,
    },
  ],
};
