import {Role} from './role';

export interface UserDetails {
  firstname: string;
  lastname: string;
  email: string;
  isActive: boolean;
  roles: Array<Role>;
}
