const { Router } = require('express');

const router = Router();


router.get('/', (req, res) => {
    res.json({
        ok: true,
        mgs: 'Todo Ok (^.^) ',
        usuario: [{
            id: 123,
            nombre: 'victor'
        }]
    })
})

module.exports = router;