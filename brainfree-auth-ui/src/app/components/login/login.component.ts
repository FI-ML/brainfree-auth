import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user/user';
import {StringUtils} from '../../utils/string.utils';
import {LoginService} from '../../services/login/login.service';
import {Router} from '@angular/router';
import {LanguageService} from '../../services/language/language.service';
import {Language} from '../../models/language';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  languages!: Language[];
  selectedLanguage!: Language;

  welcome!: string;
  password!: string;
  signIn!: string;

  isGermany: boolean = true;

  user: User = {
    email: '',
    password: ''
  };

  constructor(private readonly formBuilder: FormBuilder,
              private readonly loginService: LoginService,
              private readonly router: Router,
              private readonly languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.loginFormGroup = this.initLoginFormGroup();
    this.initLanguages();
  }

  login(): void {

    const user: User = {
      email: this.controlEmail.value,
      password: this.controlPassword.value,
    }
    this.loginService.signIn(user).subscribe(token => {
      this.router.navigateByUrl('/details', {state: {id: 1, token: token}});
    });
  }

  get controlEmail(): FormControl {
    return (<FormControl>this.loginFormGroup.get('email'));
  }

  get controlPassword(): FormControl {
    return (<FormControl>this.loginFormGroup.get('password'));
  }

  initLanguages(): void {
    this.languages = this.languageService.languages;
    this.selectedLanguage = this.languages[0];
    this.isGermany = this.selectedLanguage.abbreviation === 'de';
  }

  private initLoginFormGroup(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl({
        value: StringUtils.getInitText(this.user.email),
        disabled: false
      }, [Validators.required, Validators.email]),
      password: new FormControl({
        value: StringUtils.getInitText(this.user.password),
        disabled: false
      }, [])
      //Validators.required, Validators.min(8), Validators.pattern(StringUtils.passwordPatter)
    });
  }
}
