import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  public readonly statusCode: HttpStatusCode;

  public constructor(private readonly activatedRoute: ActivatedRoute) {
    this.statusCode = +this.activatedRoute.snapshot.params['statusCode'];
  }
}
