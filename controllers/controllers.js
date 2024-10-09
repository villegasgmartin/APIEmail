const {response} = require('express');
const { emailMutual, emailContacto } = require('./nodemailer');

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

module.exports={
    mutual, 
    contacto
}