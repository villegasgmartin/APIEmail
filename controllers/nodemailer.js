const nodemailer = require('nodemailer');
const mutualCorreo = require('../templates/emailMutual');
const contactoCorreo = require('../templates/emailContacto');

// import { Resend } from 'resend';

// const resend = new Resend('re_123456789');

// await resend.emails.send({
//   from: 'Acme <onboarding@resend.dev>',
//   to: ['delivered@resend.dev'],
//   subject: 'hello world',
//   html: '<p>it works!</p>',
// });




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
          console.log("error al enviar",process.env.SENDGRID_API_KEY, error);
          
        } else {
          console.log('mensaje enviado');
        }
      });

}

function emailContacto (mensaje, nombre, correo, destino){
  
  transporter.sendMail({
    from: "martinvillegas90@hotmail.com",
    to: destino, 
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
      console.log("error al enviar",process.env.SENDGRID_API_KEY, error);     
    } else {
      console.log('mensaje enviado');
    }
  });

}


function emailVittal(data) {
  const {
    nombre,
    dni,
    fechaNacimiento,
    telefono,
    direccion,
    numeroAsociado,
    correo,
    mensaje,
    adherentes = [],
  } = data;

  // Generar HTML para los adherentes (si existen)
  const adherentesHTML = adherentes.length
    ? `<h3 style="color: #444;">Adherentes:</h3>
       ${adherentes
         .map(
           (adh, index) => `
         <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 6px;">
           <strong>Adherente #${index + 1}</strong>
           <ul style="margin-top: 5px; padding-left: 20px;">
             <li><strong>Nombre:</strong> ${adh.nombre}</li>
             <li><strong>DNI:</strong> ${adh.dni}</li>
             <li><strong>Fecha de Nacimiento:</strong> ${adh.fechaNacimiento}</li>
             <li><strong>Parentesco:</strong> ${adh.parentesco}</li>
             <li><strong>Dirección:</strong> ${adh.direccion}</li>
             <li><strong>Teléfono:</strong> ${adh.telefono}</li>
           </ul>
         </div>`
         )
         .join("")}`
    : "<p><em>No se agregaron adherentes.</em></p>";

  // HTML completo del email
  const htmlContent = `
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; border-radius: 8px;">
    <h2 style="color: #333333; text-align: center;">Nuevo Formulario - Vittal</h2>
    
    <h3>Datos del Titular</h3>
    <table style="width: 100%; border-collapse: collapse;">
      ${[
        ["Nombre", nombre],
        ["DNI", dni],
        ["Fecha de Nacimiento", fechaNacimiento],
        ["Teléfono", telefono],
        ["Dirección", direccion],
        ["N° de Asociado", numeroAsociado || "No informado"],
        ["Correo Electrónico", correo || "No informado"],
        ["Mensaje", mensaje],
      ]
        .map(
          ([label, value]) => `
        <tr>
          <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">${label}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${value}</td>
        </tr>`
        )
        .join("")}
    </table>

    <br/>

    ${adherentesHTML}

    <p style="font-size: 13px; color: #999; text-align: center; margin-top: 20px;">Mensaje enviado desde el formulario Vittal.</p>
  </div>`;

  // Envío del correo
  transporter.sendMail(
    {
      from: "villegasgmartin@gmail.com",
      // to: "bibliotecarateriymardelplata@gmail.com",
      to: "brendagomez1310@gmail.com",
      subject: "Formulario de Consulta - Vittal",
      html: htmlContent,
    },
    function (error, info) {
      if (error) {
        console.error("Error al enviar correo:", error);
      } else {
        console.log("Correo enviado:", info.response);
      }
    }
  );
}






module.exports = {
  emailMutual,
  emailContacto,
  emailVittal
}






  





