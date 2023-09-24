import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
    try{
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);
    }catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Failed to get a post"
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after'}
        ).populate('user');

        if (!updatedPost) {
            return res.status(404).json({
                message: 'Статья не найдена',
            });
        }

        res.json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};
export const create = async (req, res) => {
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();
        res.json(post);

    }catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Failed to create a post"
        });
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const RemovedPost = await PostModel.findOneAndDelete(
            { _id: postId },
        )
        if (!RemovedPost) {
            return res.status(404).json({
                message: 'The post is not found',
            });
        }
        res.json(RemovedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to get a post',
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {_id: postId},
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            },
        )

        res.json({
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to update a post',
        });
    }

}