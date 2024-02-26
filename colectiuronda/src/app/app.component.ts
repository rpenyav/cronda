import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    const userLang = localStorage.getItem('userLang') || 'ca';
    this.translate.use(userLang);
  }
}