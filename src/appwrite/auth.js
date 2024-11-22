/* eslint-disable no-useless-catch */
import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }

    return null; //agar kuch mila hi nahi try mein return null
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      //the case when we are not able to reach out to the service
      console.log("Appwrite service :: getCurrentUser :: error", error);
      throw new Error(error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(console.log("Appwrite service :: logout :: error", error));
    }
  }
}

const authService = new AuthService();

export default authService;
