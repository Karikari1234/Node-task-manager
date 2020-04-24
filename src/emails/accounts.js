const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeMsg = (email, name) => {
    sgMail.send({
        to: email,
        from: 'naafizrahman1@gmail.com',
        subject: 'Thanks for joining us',
        text: `Hello ${name} . Glad that you joined us`
    }).then(() => {}, error => {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }
    })
}

const byebyeMsg = (email, name) => {
    sgMail.send({
        to: email,
        from: 'naafizrahman1@gmail.com',
        subject: 'Sorry to hear u go away',
        text: `Hello ${name} . Will miss u :(`
    }).catch((e) => console.log(e))
}

// const emails = {
//     welcomeMsg: welcomeMsg,
//     byebyeMsg: byebyeMsg
// }

//emails.byebyeMsg('naafizrahman1@gmail.com', 'Karim')
module.exports = {
    welcomeMsg: welcomeMsg,
    byebyeMsg: byebyeMsg
}