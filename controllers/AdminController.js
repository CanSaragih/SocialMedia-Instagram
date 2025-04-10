const { User, Post, Tag } = require('../models')
const { formatDate, formatTitle } = require('../helpers/format')

class AdminController {
    static async dashboardAdmin(req, res) {
        try {
            const users = await User.findAll({
                where: {
                    role: 'user'
                },
                order: [['createdAt', 'DESC']],
            })

            const posts = await Post.findAll({
                include: [User, Tag],
                order: [['createdAt', 'DESC']]
            })

            res.render('adminDashboard', {
                username: req.session.username,
                users,
                posts,
                formatDate
            })
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = AdminController