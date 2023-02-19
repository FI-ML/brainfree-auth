import {Injectable} from '@angular/core';
import {Language} from '../../models/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  imgPath = '../../../assets/images/country-flags'

  public get languages(): Language[] {


    return [
      {
        value: 'Deutsch',
        abbreviation: 'DE',
        countryName: 'Deutschland',
        imgPath: this.imgPath + '/germany.png'
      },
      {
        value: 'English',
        abbreviation: 'EN',
        countryName: 'England',
        imgPath: this.imgPath + '/england.png'
      }
    ];
  }
}
