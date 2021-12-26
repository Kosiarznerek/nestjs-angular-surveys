import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  public constructor(private readonly router: Router) {}

  public navigate(path: string): Promise<boolean> {
    console.log('qq');
    return this.router.navigate([path]);
  }
}
