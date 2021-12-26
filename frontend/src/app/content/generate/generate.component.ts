import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent {
  public constructor(private readonly router: Router) {}

  public navigateLanding(): Promise<boolean> {
    return this.router.navigate(['/']);
  }
}
