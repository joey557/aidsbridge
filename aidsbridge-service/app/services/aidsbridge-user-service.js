import bcrypt from 'bcryptjs';
import Users from '../models/users.js';

export const register = async (userData) => {
  try {
    const { userName, accountId, password } = userData;

    // Check if the account ID is already in use
    const existingUser = await Users.findOne({ accountId });
    if (existingUser) {
      throw new Error('Account ID is already in use');
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new Users({
      userName,
      accountId,
      password: hashedPassword
    });

    // Save the user and return
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
}

export const login = async (accountId, password) => {
  try {
    // Check if the account exists
    const user = await Users.findOne({ accountId });
    if (!user) {
      throw new Error('Account does not exist');
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password);
    //const isMatch = password === user.password;
    
    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    return user;  // Login successful, return user information
  } catch (error) {
    throw error;
  }
}

export const changePassword = async (accountId, oldPassword, newPassword) => {
  try {
    const user = await Users.findOne({ accountId });
    if (!user) {
      throw new Error('User does not exist');
    }

    // Validate the old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error('Old password is incorrect');
    }

    // Encrypt the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    return true;  // Password update successful
  } catch (error) {
    throw error;
  }
}


