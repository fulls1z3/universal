// angular
import { Component, OnInit } from '@angular/core';

// libs
import { ConfigService } from '@ngx-config/core';
import { MetaService } from '@ngx-meta/core';
// import { I18NRouterService } from '@ngx-i18n-router/core';
import { TranslateService } from '@ngx-translate/core';

// external styles
import '../assets/sass/layout.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string;

  constructor(private readonly config: ConfigService,
              private readonly translate: TranslateService,
              private readonly meta: MetaService) { // ,
              // private readonly i18nRouter: I18NRouterService) {
  }

  ngOnInit(): void {
    this.title = 'ng-seed (universal) works!';
    const defaultLanguage = this.config.getSettings('i18n.defaultLanguage');

    // add available languages & set default language
    this.translate.addLangs(this.config.getSettings('i18n.availableLanguages')
      .map((language: any) => language.code));
    this.translate.setDefaultLang(defaultLanguage.code);

    this.meta.setTag('og:locale', defaultLanguage.culture);

    // this.i18nRouter.init();

    this.setLanguage(defaultLanguage);
  }

  private setLanguage(language: any): void {
    this.translate.use(language.code).subscribe(() => {
      this.meta.setTag('og:locale', language.culture);
    });

    // this.i18nRouter.changeLanguage(language.code);
  }
}
