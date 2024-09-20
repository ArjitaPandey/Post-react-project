import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
//whenever AuthService.createAccount will be used a new account will be created.
export class AuthService {
    client = new Client();
    account;
    constructor() {
        //will include all the functionalities in constructor
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectID);
        this.account = new Account(this.client);
    }
    async createAccount({ email, password, name }) {
        try {
            //generate unique ID
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                //if account is created then directly user will get logged in.
                return this.login({ email, password });
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
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite error: getCurrentUser :: ", error);
        }
        return null;
    }
    async logOut() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}
//here we have alredy made an object in this file so that we can access all the functions of AuthService class using authService.requiredFunction()
const authService = new AuthService();
export default authService;