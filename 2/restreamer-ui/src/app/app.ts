import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false
})
export class App implements OnInit {
  constructor(private translateService: TranslateService) {
    const browserLang = this.translateService.getBrowserLang();
    const supportedLangs = ['en', 'zh'];
    
    if (browserLang && supportedLangs.includes(browserLang)) {
      this.translateService.use(browserLang);
    } else {
      this.translateService.use('en');
    }
  }

  ngOnInit(): void {}
}
