class UserProfileController {

    static async userProfile(req, res) {
        try {
            res.render('home')
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = UserProfileController