import Post from "./post.interface";
import PostModel from "./post.model";

class PostService {
    private post = PostModel;

    public async create(title: string, body: string): Promise<Post>
    {
        try {
            return await this.post.create({ title, body });
        }
        catch (error) {
            throw new Error('Unable to create post');
        }
    }
}

export default PostService;