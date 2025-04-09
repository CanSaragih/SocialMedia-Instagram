const { Post, Tag } = require('../models')

class PostController {

    static async getPost(req, res) {
        try {
            const { error } = req.query
            res.render('post-page/addPost', { error })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async postPost(req, res) {
        try {
            const { title, content, tags } = req.body
            const userId = req.session.userId
            const imgUrl = req.file?.filename ? `/uploads/${req.file.filename}` : null

            const newPost = await Post.create({
                title,
                content,
                imgUrl,
                UserId: userId
            });

            if (tags) {
                const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "")

                for (let tagName of tagArray) {
                    const [tag] = await Tag.findOrCreate({ where: { name: tagName } })

                    await newPost.addTag(tag)
                }
            }

            res.redirect('/userProfile');

        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                let msgError = error.errors.map(el => el.message)
                res.redirect(`/posts/add?error=${msgError}`)
            } else {
                res.send(error.message)
            }
        }
    }


    static async deletePost(req, res) {
        try {
            const { id } = req.params
            let post = await Post.findByPk(id)

            if (!post) {
                return res.redirect('/userProfile?error=Post not found or already deleted')
            }

            const msgDelete = `Post with title "${post.title}" has been deleted`

            await Post.destroy({
                where: {
                    id: id
                }
            })
            res.redirect(`/userProfile?message=${msgDelete}`)
        } catch (error) {
            res.send(error.message)
        }
    }

}

module.exports = PostController