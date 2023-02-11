import { GetRoleDto } from '../../role/dto/get.role.dto';
import { IsAlpha, IsBoolean, IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdateUserDetailsDto {

  @IsAlpha()
  @IsString()
  @IsNotEmpty()
  @Length(3, 70)
  firstname: string;

  @IsAlpha()
  @IsString()
  @IsNotEmpty()
  @Length(3, 70)
  lastname: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 130, { message: 'Password has to be at between 8 and 20 chars' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {
      message:
        'Passwords will contain at least 1 upper case letter'
        + '\n'
        + 'Passwords will contain at least 1 lower case letter'
        + '\n'
        + 'Passwords will contain at least 1 number or special character'
    })
  oldPasswort: string;

  @IsString()
  @Length(8, 130, { message: 'Password has to be at between 8 and 20 chars' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {
      message:
        'Passwords will contain at least 1 upper case letter'
        + '\n'
        + 'Passwords will contain at least 1 lower case letter'
        + '\n'
        + 'Passwords will contain at least 1 number or special character'
    })
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsNotEmpty()
  roles: Array<GetRoleDto>;
  
}
