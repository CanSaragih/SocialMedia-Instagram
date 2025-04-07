const { User } = require('../models')
const bcrypt = require('bcryptjs')

class UserController {

    static async getLogin(req, res) {
        try {
            const { error } = req.query
            res.render('login-page/login', { error })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async postLogin(req, res) {
        try {
            const { username, password } = req.body
            let user = await User.findOne({ where: { username } })

            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)

                if (isValidPassword) {
                    req.session.userId = user.id
                    req.session.username = user.username
                    req.session.role = user.role

                    return res.redirect('/userProfile')
                } else {
                    const msgError = `Password is incorrect`
                    return res.redirect(`/login?error=${msgError}`)
                }
            } else {
                const msgError = `Username not found`
                return res.redirect(`/login?error=${msgError}`)
            }
        } catch (error) {
            res.send(error.message)
        }
    }

    static async getRegister(req, res) {
        try {
            res.render('login-page/register')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async postRegister(req, res) {
        try {
            const { username, email, password, role } = req.body
            await User.create({ username, email, password, role })
            res.redirect('/login')
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = UserController