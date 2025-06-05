const {response} = require('express');
const { emailMutual, emailContacto, test, emailVittal } = require('./nodemailer');

const mutual = (req, res) => {
	const { mensaje, nombre, correo } = req.body;
	
	try {
		
		emailMutual (mensaje, nombre, correo);
		res.status(200).json({
			message:
				' Se ha enviado una email'
		});
	} catch (error) {
		
		res.status(500).json('error al mandar mail');
	}
};

const vittal = (req, res) => {
  const {
    nombre,
    dni,
    fechaNacimiento,
    telefono,
    direccion,
    numeroAsociado,
    correo,
    mensaje,
    adherentes,
  } = req.body;

  try {
    emailVittal({
      nombre,
      dni,
      fechaNacimiento,
      telefono,
      direccion,
      numeroAsociado,
      correo,
      mensaje,
      adherentes,
    });
    res.status(200).json({
      message: "Se ha enviado un email",
    });
  } catch (error) {
    console.error("Error al mandar mail", error);
    res.status(500).json("error al mandar mail");
  }
};


const contacto = (req, res) => {
	const { mensaje, nombre, correo, destino } = req.body;
	
	try {
		
		emailContacto (mensaje, nombre, correo, destino);
		res.status(200).json({
			message:
				' Se ha enviado una email'
		});
	} catch (error) {
		
		res.status(500).json('error al mandar mail');
	}
};

const recuperar2FA = (req, res) => {

	try {
		test();
		res.json({
			msg:'entregado'
		})
	} catch (error) {
		console.log(error);
	}
	


}

module.exports={
    mutual, 
    contacto,
	recuperar2FA,
	vittal
}