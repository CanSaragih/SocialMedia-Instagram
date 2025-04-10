const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { sendWelcomeEmail } = require('../helpers/nodeMailer')

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

                    if (user.role === 'admin') {
                        return res.redirect('/adminDashboard')
                    } else {
                        return res.redirect('/userProfile')
                    }
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
            const { error } = req.query
            res.render('login-page/register', { error })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async postRegister(req, res) {
        try {
            const { username, email, password } = req.body
            await User.create({
                username,
                email,
                password,
                role: 'user'
            })

            await sendWelcomeEmail(email, username);
            res.redirect('/login')
        } catch (error) {
            if (
                error.name === 'SequelizeValidationError' ||
                error.name === 'SequelizeUniqueConstraintError'
            ) {
                let msgErrror = error.errors.map(er => er.message)
                res.redirect(`/login/register?error=${msgErrror}`)
            } else {
                res.send(error.message)
            }
        }
    }

    static async getLogout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/login')
            }
        })
    }
}

module.exports = UserController