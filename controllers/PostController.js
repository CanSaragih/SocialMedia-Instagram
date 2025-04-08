const { Post } = require('../models')

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
            const { title, content } = req.body
            const userid = req.session.userId
            const imgUrl = req.file?.filename ? `/uploads/${req.file.filename}` : null

            await Post.create({
                title,
                content,
                imgUrl,
                UserId: userid
            })

            res.redirect('/userProfile')
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

        } catch (error) {
            res.send(error.message)
        }
    }

}

module.exports = PostController