import {IsBoolean, IsEmail, IsNotEmpty, IsString, Length, Matches} from 'class-validator';

export class SignupDto {

    @IsString()
    @IsNotEmpty()
    @Length(3, 40)
    public firstname: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 70)
    public lastname: string;


    @IsEmail()
    @IsNotEmpty()
    @IsString()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 230, {message: 'Password has to be at between 8 and 20 chars'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
            message:
                'Passwords will contain at least 1 upper case letter'
                + '\n'
                + 'Passwords will contain at least 1 lower case letter'
                + '\n'
                + 'Passwords will contain at least 1 number or special character'
        })
    public password: string;

    @IsNotEmpty()
    @IsBoolean()
    public isActive: boolean;
}
