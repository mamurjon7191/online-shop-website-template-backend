const pug = require("pug");
const nodemailer = require("nodemailer");

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.from = `Ibragimov Mamurjon ${process.env.EMAIL_FROM}`;
    this.url = url;
    this.name = user.name;
  }
  // 1)transporter created
  transport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendMessage(templete, message) {
    // 1)template render  pug fileni htmlga render qilish un

    const pugTemplate = `${__dirname}/../view/mail/${templete}.pug`;

    const html = pug.renderFile(pugTemplate, {
      name: this.name,
      url: this.url,
      message: message,
    }); // agar pugda turgan bolsa htmlga otkazib beradi

    // 2) define email options

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: message,
      html: html,
    };

    // 3)create transport and send
    await this.transport().sendMail(mailOptions);
  }

  sendWelcome() {
    this.sendMessage("welcome", "Welcome to our website enjoy the best tours!");
  }
  resetPassword() {
    this.sendMessage(
      "reset-password",
      "Your reset password has been sent to your email!"
    );
  }
  buyProduct() {
    this.sendMessage(
      "buy-product",
      "Your products will be delivired in 3 days thank you for understanding!"
    );
  }
}

module.exports = Email;
