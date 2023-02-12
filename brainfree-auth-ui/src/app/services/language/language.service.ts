import {Injectable} from '@angular/core';
import {Language} from '../../models/language';
import {TranslateService} from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('de');
    translate.use('de');
  }

  public get languages(): Language[] {


    return [
      {value: 'Deutsch', abbreviation: 'DE', imgPath: '../../assets/country/germany.png'},
      {value: 'English', abbreviation: 'EN', imgPath: '../../assets/country/england.png'}
    ];
  }
}
