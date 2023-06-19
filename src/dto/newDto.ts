import { IsNotEmpty, Length, IsEmail, MinLength } from 'class-validator';

export class NewDto {
    [x: string]: string;
    @IsNotEmpty({ message: 'User ID should not be empty' })
    userId: string;

    @IsNotEmpty({ message: 'Email should not be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Username should not be empty' })
    username: string;

    @IsNotEmpty({ message: 'Password should not be empty' })
    password: string;


    @IsNotEmpty({ message: 'Current password should not be empty' })
    currentPassword: string;

    @IsNotEmpty({ message: 'New password should not be empty' })
    @MinLength(8, { message: 'New password should be at least 8 characters long' })
    newPassword: string;


}


