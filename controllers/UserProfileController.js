const { User, UserProfile, Post, Tag } = require('../models')
const { formatDate, formatTitle } = require('../helpers/format')
const { Op } = require('sequelize')


class UserProfileController {

    static async userProfile(req, res) {
        try {
            const { message } = req.query
            const userId = req.session.userId

            const user = await User.findByPk(userId, {
                include: [UserProfile]
            })

            if (!user) {
                return res.redirect('/login?error=User not found')
            }

            const posts = await Post.getPostWithTagsAndUser(userId)

            res.render('user-profile/userProfile', {
                message,
                user,
                profile: user.UserProfile,
                username: user.username,
                posts,
                formatDate,
                formatTitle

            })

        } catch (error) {
            res.send(error.message)
        }
    }


    static async getAddProfile(req, res) {
        try {
            const { error } = req.query
            res.render('user-profile/addProfile', { error })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async postAddProfile(req, res) {
        try {
            const { bio, gender, age, location } = req.body
            const userId = req.session.userId
            const avatarUrl = req.file?.filename ? `/uploads/${req.file.filename}` : null

            await UserProfile.create({
                UserId: userId,
                avatarUrl,
                bio,
                gender,
                age,
                location
            })

            res.redirect('/userProfile')

        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                let msgError = error.errors.map(el => el.message)
                res.redirect(`/userProfile/add?error=${msgError}`)
            } else {
                res.send(error.message)
            }
        }
    }

    static async getEditProfile(req, res) {
        try {
            const { id } = req.params
            const { error } = req.query
            let user = await UserProfile.findOne({ where: { UserId: id } })
            res.render('user-profile/editProfile', { user, error, formatDate })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async postEditProfile(req, res) {
        try {
            const { id } = req.params
            const { bio, gender, age, location } = req.body
            const avatarUrl = req.file?.filename ? `/uploads/${req.file.filename}` : null

            await UserProfile.update({
                avatarUrl,
                bio,
                gender,
                age,
                location
            }, {
                where: {
                    UserId: id
                }
            })
            res.redirect('/userProfile')
        } catch (error) {
            const { id } = req.params
            if (error.name === 'SequelizeValidationError') {
                let msgError = error.errors.map(el => el.message)
                res.redirect(`/userProfile/edit/${id}?error=${msgError}`)
            } else {
                res.send(error.message)
            }
        }
    }

    static async searchUser(req, res) {
        try {
            const { username } = req.query

            const users = await User.findAll({
                where: {
                    username: {
                        [Op.iLike]: `%${username}%`
                    },
                    role: 'user'
                },
                include: [UserProfile]
            })

            res.render('user-profile/searchUser', { users, username })
        } catch (error) {
            res.send(error.message);
        }
    }

    static async publicProfile(req, res) {
        try {

            const userId = req.params.id

            const profile = await UserProfile.findOne({
                where: { UserId: userId },
                include: [User]
            });

            if (!profile) {
                return res.send("User not found")
            }

            const posts = await Post.getPostWithTagsAndUser(userId);
            console.log(posts.map(p => p.imageUrl))
            res.render('user-profile/publicProfile', {
                profile,
                username: profile.User.username,
                posts,
                formatDate,
                formatTitle
            });

        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = UserProfileController