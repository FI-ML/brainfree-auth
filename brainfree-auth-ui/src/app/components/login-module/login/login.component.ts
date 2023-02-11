import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { StringUtils } from '../../../utils/string.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;

  user: User = {
    email: '',
    password: ''
  };

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this.initLoginFormGroup();
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
      }, [Validators.required, Validators.min(8), Validators.pattern(StringUtils.passwordPatter)])
    });
  }

  get controlEmail(): FormControl {
    return (<FormControl>this.loginFormGroup.get('email'));
  }

  get controlPassword(): FormControl {
    return (<FormControl>this.loginFormGroup.get('password'));
  }
}
