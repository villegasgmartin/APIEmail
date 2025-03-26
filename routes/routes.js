const {Router} = require('express');
const { mutual, contacto, recuperar2FA, vittal } = require('../controllers/controllers');

router = Router()

router.get('/', (req, res) => {
    res.send('Api para mandar mails')
})


router.post('/email-mutual', mutual);

router.post('/email-vittal', vittal);

router.post('/email-contacto', contacto);

router.post('/test', recuperar2FA)

module.exports = router;