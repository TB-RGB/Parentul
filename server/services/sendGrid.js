const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
    const htmlContent = text.split('\n').map(line => {
        if (line.trim() === '') {
            return '<br>';
        } else {
            return `<p>${line}</p>`;
        }
    }).join('');

    const msg = {
        to,
        from: 'parentul.app@gmail.com', 
        subject,
        text,
        html: htmlContent,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent successfully to', msg.to)
    } catch (error) {
        console.error('Error sending email:', error)
        if (error.response) {
            console.error(error.response.body)
        }
    }
};

module.exports = sendEmail;