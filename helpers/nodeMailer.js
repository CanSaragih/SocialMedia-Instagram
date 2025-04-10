const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'canwhardana@gmail.com',
        pass: 'vzaqeolowwxfbreq'
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log('Transporter error:', error);
    } else {
        console.log('Server is ready to take messages');
    }
});

function sendWelcomeEmail(to, username) {
    const mailOptions = {
        from: '"InstaLook" <canwhardana@gmail.com>',
        to: to,
        subject: 'Selamat Datang di InstaLook!',
        html: `
            <h1>Halo, ${username}!</h1>
            <p>Terima kasih sudah bergabung di platform InstaLook 🎉</p>
            <p>Yuk mulai bagikan moment mu di InstaLook!</p>
        `
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendWelcomeEmail };
