import { createToken } from "../../utils/token";
import UserModel from "./user.model";

class UserService {
    private user = UserModel;

    public async register(name: string, email: string, password: string, role: string): Promise<string|Error> {
        try {
            const user = await this.user.create({ name, email, password, role });
            return createToken(user);
        } 
        catch (err: any) {
            throw new Error(err.message);
        }
    }

    public async login(email: string, password: string): Promise<string|Error> {
        try {
            const user = await this.user.findOne({ email });
            if(!user) {
                throw new Error('Unable to find user with that email address');
            }

            if(await user.isValidPassword(password)) {
                return createToken(user);
            }

            throw new Error('Invalid credentials');
        } 
        catch (error) {
            throw new Error('Unable to log user in');
        }
    }
}

export default UserService;