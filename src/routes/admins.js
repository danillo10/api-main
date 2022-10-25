const router = require('express').Router()
const AdminController = require('../controllers/AdminController')
const validation = require('../middlewares/validations/admin')
const auth = require('../middlewares/auth')
const { upload } = require('../middlewares/uploads/images')

const controller = new AdminController()

router.post('/login', validation.login, controller.login)
router.post(
  '/forgot-password',
  validation.forgotPassword,
  controller.forgotPassword
)
router.put(
  '/recover-password/:token',
  validation.recoverPassword,
  controller.recoverPassword
)
router.post('/first-user', validation.firstUser, controller.firstUser)

router.get('/', auth.admin, controller.list)
router.get('/:id', auth.admin, controller.show)
router.post('/store', auth.admin, validation.store, controller.store)
router.put(
  '/update-password',
  auth.admin,
  validation.updatePassword,
  controller.updatePassword
)
router.put('/:id/update', auth.admin, validation.update, controller.update)
router.put('/:id/upload', auth.admin, upload('file'), controller.uploadImage)
router.delete('/:id', auth.admin, controller.delete)

module.exports = router
