import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  QuestionMetadataType,
  Survey,
  SurveyStatistics,
  SurveySubmission,
} from 'common';
import { AuthQueryParam } from '../../authenticate/authenticate.models';
import { ResultsRouteData } from './results.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  public readonly survey: Survey;
  public readonly surveyStatistics: SurveyStatistics;
  public readonly surveySubmissions: SurveySubmission[] | null;
  public readonly EQuestionMetadataType: typeof QuestionMetadataType;

  public constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    const { data } = <ResultsRouteData>this.activatedRoute.snapshot.data;
    this.survey = data.survey;
    this.surveyStatistics = data.surveyStatistics;
    this.surveySubmissions = data.surveySubmissions;
    this.EQuestionMetadataType = QuestionMetadataType;
  }

  public navigateArchive(submission: SurveySubmission) {
    this.router.navigate(['/surveys/archive'], {
      queryParams: {
        [AuthQueryParam.SurveyIdentifier]: this.survey.identifier,
        [AuthQueryParam.SubmissionIndentifier]: submission.identifier,
      },
    });
  }
}
