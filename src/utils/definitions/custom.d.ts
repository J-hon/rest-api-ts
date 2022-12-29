import User from "../../resources/user/user.interface";

declare global {
    namespace Express {
        user: User;
    }
}