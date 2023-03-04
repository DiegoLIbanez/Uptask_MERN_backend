import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    const {email,nombre,token} = datos;

    const transport = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });

      const info = await transport.sendMail({
        from:'"Uptask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: 'Confirma Tu Cuenta',
        text: 'Comprueba tu cuenta en Uptask',
        html:`<P>Hola: ${nombre} Comprueba tu cuenta en Uptask</P>
        <p>Tu cuenta ya esta casi lista solo debes comprobarla en el siguiente enlace:</p>
        <a href="https://uptask-12312.netlify.app/confirmar/${token}">Comprobar Cuenta</a>
        <p>Si tu no confirmaste tu cuenta, puedes ignorar el mensaje</p>
        `
      })
}


export const emailOlvidePassword = async (datos) => {
  const {email,nombre,token} = datos;
  //TODO: Mover hacia variables de entorno
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
    });

    const info = await transport.sendMail({
      from:'"Uptask - Administrador de Proyectos" <cuentas@uptask.com>',
      to: email,
      subject: 'Uptask - Restablece tu Contraseña',
      text: 'Restablece tu Contraseña',
      html:`<P>Hola: ${nombre} has solicitado reestablecer tu contraseña en Uptask</P>
      <p>Sigue el siguinete enlace para generar un nueva contraseña:</p>
      <a href="https://uptask-12312.netlify.app/olvide-password/${token}">Reestablecer Contraseña</a>
      <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
      `
    })
}