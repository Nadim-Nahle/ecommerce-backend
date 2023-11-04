import { Injectable } from '@nestjs/common';
import { SignupDto } from './signup.dto';
import * as admin from 'firebase-admin';
import { User } from './user.entity';
import { UpdateUserDto } from './updateUser.dto';

@Injectable()
export class AuthService {

  async createUser(signupDto: SignupDto, role: string): Promise<User> {
    const { email, password, name } = signupDto;
  
    // Create the user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });
  
    // Set custom claim for user role
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });
  
    // Save additional user data in your database
    const newUser = new User();
    newUser.uid = userRecord.uid;
    newUser.email = userRecord.email;
    newUser.name = name;
    // Set other user properties as needed
  
    // Save the user in your database
    // Example using TypeORM:
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: role });
  
    return newUser;
  }

  async getAllUsers() {
    try {
      const userList = await admin.auth().listUsers();
      const usersWithRoles = await Promise.all(
        userList.users.map(async (user) => {
          const customClaims = (await admin.auth().getUser(user.uid)).customClaims;
          const role = customClaims && customClaims.role ? customClaims.role : 'user';
  
          return {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: role, // Include the user's role
            // Add other user properties you need
          };
        })
      );
      
      return usersWithRoles;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  async updateRole(userId: string, updateUserRoleDto: UpdateUserDto) {
    // Validate and sanitize the data in updateUserRoleDto
    // Check if the user exists
    // Update the user's role using custom claims

    // Check if the 'role' is provided and update the custom claim
    if (updateUserRoleDto.role) {
      // Validate and sanitize the 'role' if needed
      // You can add your own validation logic here

      // Update the custom claim for the user's role
      await admin.auth().setCustomUserClaims(userId, { role: updateUserRoleDto.role });
    }

    return {
      message: 'User role updated successfully',
    };
  }

  async getUserById(userId: string): Promise<admin.auth.UserRecord> {
    try {
      const user = await admin.auth().getUser(userId);
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }
}
