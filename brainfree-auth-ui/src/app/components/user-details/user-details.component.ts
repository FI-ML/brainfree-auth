import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserDetails} from '../../models/user/user.details';

@Component({
  selector: 'app-user',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

//TODO: BAD CODE
// NOT TYPE SAFE BACKEND MUST SEND A TYPE OBJECT REFACTOR IT
export class UserDetailsComponent implements OnInit {

  state!: any;

  user!: UserDetails;

  constructor(private readonly router: Router) {
    this.state = this.router.getCurrentNavigation()?.extras.state;

    console.log(JSON.stringify(this.state));
  }

  ngOnInit(): void {
    this.extractUserDetails();
  }


  extractUserDetails(): void {
    const helper = new JwtHelperService();
    const accessToken = this.state.token.accessToken;

    console.log(accessToken);

    const decodedToken = helper.decodeToken(accessToken);

    console.log(JSON.stringify(decodedToken))
    this.user = {
      firstname: !decodedToken.firstname ? '' : decodedToken.firstname,
      lastname: !decodedToken.lastname ? '' : decodedToken.lastname,
      email: !decodedToken.email ? '' : decodedToken.email,
      roles: !decodedToken.roles ? [] : decodedToken.roles,
      isActive: !decodedToken.isActive ? false : decodedToken.isActive,
    }
  }

}
