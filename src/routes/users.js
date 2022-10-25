const router = require('express').Router()
const UserController = require('../controllers/UserController')
const validation = require('../middlewares/validations/user')
const auth = require('../middlewares/auth')
const { upload } = require('../middlewares/uploads/images')

const controller = new UserController()

router.get('/:id', controller.show)
router.post('/login', validation.login, controller.login)
router.post(
  '/forgot-password',
  validation.forgotPassword,
  controller.forgotPassword
)
router.post('/list-by-firm', controller.listByFirm)
router.put(
  '/recover-password/:token',
  validation.recoverPassword,
  controller.recoverPassword
)
router.delete('/:id', controller.removeUser)

router.post(
  '/store-auth-user',
  auth.user,
  validation.storeAuthUser,
  controller.storeAuthUser
)
router.put(
  '/update-password',
  auth.user,
  validation.updatePassword,
  controller.updatePassword
)
router.put(
  '/:id/update-auth-user',
  auth.user,
  validation.updateAuthUser,
  controller.updateAuthUser
)
router.put('/:id/upload', auth.user, upload('file'), controller.uploadImage)

router.post('/store', auth.admin, validation.store, controller.store)
router.put('/:id/update', auth.admin, validation.update, controller.update)
router.put(
  '/:id/admin-upload',
  auth.admin,
  upload('file'),
  controller.uploadImage
)

module.exports = router
