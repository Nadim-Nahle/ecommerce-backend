import { Injectable } from '@nestjs/common';
import { SignupDto } from './signup.dto';
import * as admin from 'firebase-admin';
import { User } from './user.entity';

@Injectable()
export class AuthService {

  async createUser(signupDto: SignupDto): Promise<User> {
    const { email, password, name } = signupDto;

    // Create the user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Save additional user data in your database
    const newUser = new User();
    newUser.uid = userRecord.uid;
    newUser.email = userRecord.email;
    newUser.name = name;
    // Set other user properties as needed

    // Save the user in your database
    // Example using TypeORM:    
    return newUser;
  }

  async getAllUsers() {
    try {
      const userList = await admin.auth().listUsers();
      return userList.users.map((user) => ({
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        // Add other user properties you need
      }));
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }
}
