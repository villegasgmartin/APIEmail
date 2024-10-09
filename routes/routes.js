const {Router} = require('express');
const { mutual, contacto } = require('../controllers/controllers');

router = Router()

router.get('/', (req, res) => {
    res.send('Api para mandar mails')
})


router.post('/email-mutual', mutual);

router.post('/email-contacto', contacto);

module.exports = router;