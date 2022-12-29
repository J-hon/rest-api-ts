import { Router, Response, Request, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import { create } from './post.validation';
import PostService from './post.service';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware';

class PostController implements Controller
{
    public path = '/posts';
    public router = Router();
    private postService: PostService;

    constructor() {
        this.initializeRoutes();
        this.postService = new PostService();
    }

    public initializeRoutes(): void
    {
        this.router.post(`${this.path}`, validationMiddleware(create), this.create);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response|void> => {
        try {
            const { title, body } = req.body;
            const post = await this.postService.create(title, body);

            res.status(201).json({ post });
        }
        catch(err: any) {
            next(new HttpException(400, "Unable to create post"));
        }
    }
}

export default PostController;