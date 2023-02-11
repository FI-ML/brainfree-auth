import {IsAlpha, IsNotEmpty, IsString, Length} from 'class-validator';

export class CreateRoleDto {

    @IsAlpha()
    @IsString()
    @IsNotEmpty()
    @Length(4, 80)
    name: string
}
