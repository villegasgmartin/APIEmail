const nodemailer = require('nodemailer');
const mutualCorreo = require('../templates/emailMutual');
const contactoCorreo = require('../templates/emailContacto');




let transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY
  }
})
function emailMutual (mensaje, nombre, correo){
  console.log(mensaje, nombre, correo)
      transporter.sendMail({
        from: "martinvillegas90@hotmail.com",
        to: "villegasgmartin@gmail.com", 
        subject: "Consulta AMI Mutual", // Subject line
        text: "Consulta AMI Mutual", 
        html: `<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333333; text-align: center;">Nuevo Mensaje de Ami Mutual</h2>
        <p style="font-size: 16px; color: #555555;">Has recibido un nuevo mensaje a través del formulario de contacto. A continuación, los detalles:</p>
        
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #dddddd; font-weight: bold; color: #333;">Nombre:</td>
                <td style="padding: 10px; border-bottom: 1px solid #dddddd; color: #555;">${nombre}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #dddddd; font-weight: bold; color: #333;">Correo Electrónico:</td>
                <td style="padding: 10px; border-bottom: 1px solid #dddddd; color: #555;">${correo}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #dddddd; font-weight: bold; color: #333;">Mensaje:</td>
                <td style="padding: 10px; border-bottom: 1px solid #dddddd; color: #555;">${mensaje}</td>
            </tr>
        </table>
        
        <p style="font-size: 14px; color: #777777; text-align: center; margin-top: 20px;">Este mensaje fue enviado desde el formulario de contacto de AMI Mutual.</p>
    </div>`, // html body
        // html:'correo'
      }, function(error, info){
        if (error) {
          console.log(error);
          msg:'error al inviar mail'
        } else {
          console.log('mensaje enviado');
        }
      });

}

function emailContacto (mensaje, nombre, correo, destino){
  
  transporter.sendMail({
    from: "martinvillegas90@hotmail.com",
    to: destino, 
    cc: "brendagomez1310@gmail.com",
    subject: "Consulta desde coopertativa electrica", // Subject line
    text: "Consulta Contacto", 
    html: `<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333333; text-align: center;">Nuevo Mensaje de Contacto</h2>
        <p style="font-size: 16px; color: #555555;">Has recibido un nuevo mensaje a través del formulario de contacto. A continuación, los detalles:</p>
        
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #dddddd; font-weight: bold; color: #333;">Nombre:</td>
                <td style="padding: 10px; border-bottom: 1px solid #dddddd; color: #555;">${nombre}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #dddddd; font-weight: bold; color: #333;">Correo Electrónico:</td>
                <td style="padding: 10px; border-bottom: 1px solid #dddddd; color: #555;">${correo}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #dddddd; font-weight: bold; color: #333;">Mensaje:</td>
                <td style="padding: 10px; border-bottom: 1px solid #dddddd; color: #555;">${mensaje}</td>
            </tr>
        </table>
        
        <p style="font-size: 14px; color: #777777; text-align: center; margin-top: 20px;">Este mensaje fue enviado desde el formulario de contacto.</p>
    </div>`, // html body
  }, function(error, info){
    if (error) {
      console.log(error);
      msg:'error al inviar mail'
    } else {
      console.log('mensaje enviado');
    }
  });

}








module.exports = {
  emailMutual,
  emailContacto
}






  





