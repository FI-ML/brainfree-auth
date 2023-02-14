import {Component, OnInit} from '@angular/core';
import {Language} from '../../models/language';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../services/language/language.service';

@Component({
  selector: 'app-internationalization',
  templateUrl: './internationalisation.component.html',
  styleUrls: ['./internationalisation.component.scss']
})
export class InternationalisationComponent implements OnInit {

  languages!: Language[];
  selectedLanguage!: Language;

  selection = false;

  constructor(private readonly translateService: TranslateService,
              private readonly languageService: LanguageService) {
    translateService.addLangs(languageService.languages.map(language => language.value.toLowerCase()));
    translateService.setDefaultLang('de');
    translateService.use('de');
  }


  ngOnInit(): void {
    this.initLanguages();
  }

  onLanguageChange(index: number): void {
    this.selectedLanguage = this.languages[index];
    this.translateService.use(this.selectedLanguage.abbreviation.toLowerCase());
    this.selection = false;
  }

  initLanguages(): void {
    this.languages = this.languageService.languages;
    const browserLang = this.languages
      .filter(x => x.abbreviation.toLowerCase() === this.translateService.getBrowserLang())[0];

    if (!browserLang.value || browserLang.value.length === 0) {
      this.selectedLanguage = this.languages[1];
      return;
    }
    this.selectedLanguage = browserLang;
  }

  selectAction() {
    this.selection = true;
  }
}
