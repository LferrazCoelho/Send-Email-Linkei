const mailer = require("nodemailer");
 
module.exports = (email, nome, telefone) => {
    const smtpTransport = mailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        secure: false,
        auth: {
            user: 'lferraz.dev@gmail.com',
            pass: 'L0Q3sWg6MBmxTG4U'
        }
    })
    
    const mail = {
        from: "Omega Form <lferraz.dev@gmail.com>",
        to: "lferraz.coelho@gmail.com",
        subject: `${nome} enviou seus contatos`,
        html: 
            `
            <h1>Captura de Lead:</h1>
            <p>Nome: ${nome}</p>
            <p>Email: ${email}</p>
            <p>Telefone: ${telefone}</p>
            `
    }
    
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })
}