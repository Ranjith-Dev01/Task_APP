const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ranjithkumar@bitcot.com',
    subject: 'Welcome',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
  });
};

const cancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ranjithkumar@bitcot.com',
    subject: 'Sad TO HEAR !! 🙃 ',
    text: `Its hard to hear ${name}, can you please contact us for more information`,
  });
};

module.exports = { sendWelcomeEmail, cancelEmail};
