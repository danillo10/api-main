const router = require('express').Router()
const AccountController = require('../controllers/AccountController')
const validation = require('../middlewares/validations/account')
const auth = require('../middlewares/auth')

const controller = new AccountController()

router.get('/:id', auth.admin, controller.showAccount)
router.post('/list-by-firm', auth.admin, controller.listAccountsByFirm)
router.post('/store', auth.admin, validation.store, controller.storeAccount)
router.put(
  '/:id/update',
  auth.admin,
  validation.update,
  controller.updateAccount
)
router.delete('/:id', auth.admin, controller.deleteAccount)

module.exports = router
