const router = require('express').Router()
const FirmController = require('../controllers/FirmController')
const validation = require('../middlewares/validations/firm')
const auth = require('../middlewares/auth')

const controller = new FirmController()

router.get('/', auth.admin, controller.listFirms)
router.get('/:id', auth.admin, controller.showFirm)
router.post('/store', auth.admin, validation.store, controller.storeFirm)
router.put('/:id/update', auth.admin, validation.update, controller.updateFirm)
router.delete('/:id', auth.admin, controller.deleteFirm)

module.exports = router
