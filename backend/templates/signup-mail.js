'use strict'
const nodemailer = require('nodemailer');
require('dotenv').config();
this.enviar_mail = (pnombre,altas) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      secure: true,
      secureConnection: false,
      tls: {
        ciphers: "SSLv3",
      },
      requireTLS: true,
      port: 465,
      debug: true,
      connectionTimeout: 10000,
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    });
    let mail_options = {
        from: 'informe@xpectrelabs.com',
        to: 'juanantonio.martinez2003@gmail.com',
        subject: 'Notificación de actividad en Novum',
        html: `
            <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#ffffff" bgcolor="#ffffff">
                <tr>
                    <td bgcolor="" width="600px">
                        <h1 style="color: #000; text-align:center"><span style="color: #00c62f">N</span>ovum</h1>
                        <p  style="color: #000; text-align:center">
                            <b><span style="color: #00c62f">Reporte de actividades:</span></b>
                        </p>
                        <p  style="color: #000; text-align:left">
                            <b>Registros de alta del día:</b>
                        </p>
                    </td>
                </tr>
                <tr bgcolor="#fff">
                    <td style="text-align:Left;">
                        <ul style="text-align:Left; padding: 0px;">
                           ${altas}
                        </ul>
                    </td>
                </tr>
            </table>
        `
    };
    transporter.sendMail(mail_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo se envío correctamente ' + info.response);
        }
    });
};
module.export = this;