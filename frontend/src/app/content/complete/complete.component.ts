import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent {
  public constructor(private readonly activatedRoute: ActivatedRoute) {
    console.log(this.activatedRoute.snapshot.data['survey']);
  }
}
