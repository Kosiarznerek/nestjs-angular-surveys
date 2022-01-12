import fetch from 'node-fetch';
import _ from 'lodash';
import {
  CreateSurvey,
  CreateSurveyQuestion,
  QuestionMetadataType,
  Survey,
  SurveyDisplayFormat,
} from 'common';

interface TestResult {
  totalRequests: number;
  validRequests: number;
  averageResponseTime: number;
  minimumResponseTime?: number;
  maximumResponseTime?: number;
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

const mockCreateSurveyQuestionModel = (
  orderIndex: number,
): CreateSurveyQuestion => ({
  orderIndex: orderIndex,
  timeLimitInSeconds: 60,
  metadata: {
    type: QuestionMetadataType.PlainText,
    minimumLength: 1,
    maximumLength: 10,
  },
  label: 'string',
  isRequired: true,
});

const mockCreateSurveyModel = (): CreateSurvey => ({
  submittableFrom: '2022-01-12T13:43:01.692Z',
  submittableTo: '2022-01-12T13:43:01.692Z',
  maximumSubmissions: 100,
  publicStatistics: true,
  displayFormat: SurveyDisplayFormat.AllAtOnce,
  questions: [
    mockCreateSurveyQuestionModel(1),
    mockCreateSurveyQuestionModel(2),
    mockCreateSurveyQuestionModel(3),
  ],
});

const createMockSurvey = async (model: CreateSurvey): Promise<Survey> => {
  const response = await fetch('http://localhost:3000/surveys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mockCreateSurveyModel()),
  });
  return response.json() as Promise<Survey>;
};

const isResultValid = (
  input: CreateSurvey,
  output: DeepPartial<Survey>,
): boolean => {
  delete output.identifier;
  delete output.authenticationToken;
  delete output.createdAt;
  output.questions?.forEach((question) => delete question?.identifier);
  return _.isEqual(input, output);
};

const calculateTime = async (promise: () => Promise<void>): Promise<number> => {
  const start: Date = new Date();
  await promise();
  return new Date().valueOf() - start.valueOf();
};

const startPerformTest = async (tests: number): Promise<void> => {
  const results: TestResult = {
    totalRequests: 0,
    validRequests: 0,
    averageResponseTime: 0,
  };

  for (let i = 0; i < tests; i++) {
    const responseTime: number = await calculateTime(
      async (): Promise<void> => {
        const input: CreateSurvey = mockCreateSurveyModel();
        const output: Survey = await createMockSurvey(input);

        if (isResultValid(input, output)) results.validRequests++;
      },
    );

    results.totalRequests += 1;
    results.averageResponseTime += responseTime;

    if (
      !results.minimumResponseTime ||
      results.minimumResponseTime > responseTime
    ) {
      results.minimumResponseTime = responseTime;
    }
    if (
      !results.maximumResponseTime ||
      results.maximumResponseTime < responseTime
    ) {
      results.maximumResponseTime = responseTime;
    }
  }

  results.averageResponseTime /= tests;
  console.log(results);
};

startPerformTest(1);
