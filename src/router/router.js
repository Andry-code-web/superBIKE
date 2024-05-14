const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Crear transportador de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mendozabruno455@gmail.com',
        pass: 'oxyb rkhb nkfz duri'
    }
});

// Función para enviar correo electrónico
const enviarCorreo = (destinatario, nombre, telefono, mensaje) => {
    const mailOptions = {
        from: 'mendozabruno455@gmail.com',
        to: destinatario,
        subject: 'Super BIKE',
        html: `
            <p>Bienvenido ${nombre} con numero ${telefono}, ya eres parte de Super BIKE.</p>
            <p>Mensaje: ${mensaje}</p>
            <p>
            ¡Gracias por unirte a nosotros! Esperamos que disfrutes de nuestros servicios.</br>
            <a href="https://superbikeeirl.wixsite.com/inicio/bicicletas">Has click para acceder a la tienda&#9757;</a>
            </p>
            <img src="cid:oferta" alt="Super BIKE">
        `,
        attachments: [
            {
                filename: '6.png', // Nombre de la imagen adjunta
                path: './public/img/ofera_de_bicicleta.png', // Ruta de la imagen en tu servidor
                cid: 'oferta' // Identificador único para la imagen
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};

// Configuración de las rutas
router.get("/", (req, res, next)=>{
    res.render("landing")
});

router.get("/gracias", (req, res, next) =>{
    res.render("gracias");
});

// Manejar el envío del formulario
router.post("/", (req, res) => {
    // Obtener datos del formulario
    const { Nombre, Email, Telefono, Mensaje } = req.body;

    // Llamar a la función para enviar correo electrónico
    enviarCorreo(Email, Nombre, Telefono, Mensaje);

    // Redirigir a una página de confirmación o renderizar un mensaje de confirmación
    res.redirect("/gracias");
});

module.exports = router;
