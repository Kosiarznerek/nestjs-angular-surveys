import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionMetadataType, Survey, SurveySubmission } from 'common';
import { ArchiveRouteData } from './archive.model';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent {
  public readonly survey: Survey;
  public readonly surveySubmission: SurveySubmission;
  public readonly EQuestionMetadataType: typeof QuestionMetadataType;

  public constructor(private readonly activatedRoute: ActivatedRoute) {
    const { data } = <ArchiveRouteData>this.activatedRoute.snapshot.data;
    this.survey = data.survey;
    this.surveySubmission = data.surveySubmission;
    this.EQuestionMetadataType = QuestionMetadataType;
  }
}
