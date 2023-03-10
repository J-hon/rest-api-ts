import { Router, Response, Request, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import { register, login } from './user.validation';
import UserService from './user.service';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware';
import authenticated from "../../middleware/authenticated.middleware";

class UserController implements Controller
{

    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(): void
    {
        this.router.post(`${this.path}/register`, validationMiddleware(register), this.register);
        this.router.post(`${this.path}/login`, validationMiddleware(login), this.login);
        this.router.post(`${this.path}`, authenticated, this.getUser);
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response|void> => {
        try {
            const { name, email, password } = req.body;
            const token = await this.UserService.register(name, email, password, 'user');

            res.status(201).json({ token });
        }
        catch(err: any) {
            next(new HttpException(400, err.message));
        }
    }

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response|void> => {
        try {
            const { email, password } = req.body;
            const token = await this.UserService.login(email, password);

            res.status(200).json({ token });
        }
        catch(err: any) {
            next(new HttpException(400, err.message));
        }
    }

    private getUser = (
        req: Request|any,
        res: Response,
        next: NextFunction
    ): Response|void => {
        if(!req.user) {
            return next(new HttpException(400, 'User not logged in'));
        }

        res.status(200).json({ user: req.user });
    }

}

export default UserController;