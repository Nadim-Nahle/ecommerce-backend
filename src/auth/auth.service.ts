import { Injectable } from '@nestjs/common';
import { SignupDto } from './signup.dto';
import * as admin from 'firebase-admin';
import { User } from './user.entity';

@Injectable()
export class AuthService {

    async createUser(signupDto: SignupDto): Promise<User> {
        const { email, password } = signupDto;
    
        // Create the user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
          email,
          password,
        });
    
        // Save additional user data in your database
        const newUser = new User();
        newUser.uid = userRecord.uid;
        newUser.email = userRecord.email;
        // Set other user properties as needed
    
        // Save the user in your database
        // Example using TypeORM:    
        return newUser;
      }
}
