const router = require('express').Router()
const UserGroupController = require('../controllers/UserGroupController')
const validation = require('../middlewares/validations/user')
const auth = require('../middlewares/auth')

const controller = new UserGroupController()

/* FindById */
router.get('/:id', controller.show);
/* FindAll */
router.post('/list-by-firm', controller.findAll);
/* Create */
router.post('/store', auth.user,controller.store);
/* Delete */
router.delete('/:id', controller.remove);
/* Update */
router.put('/:id/update',auth.user,controller.update);

module.exports = router
