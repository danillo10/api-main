const router = require('express').Router()
const ReportController = require('../controllers/ReportController')
const validation = require('../middlewares/validations/report')
const auth = require('../middlewares/auth')

const controller = new ReportController()

router.get('/:id', auth.user, controller.showReport)
router.post('/list-by-user', auth.user, controller.listReportsByUser)
router.post(
  '/list-by-user-with-card',
  auth.user,
  controller.listReportsByUserWithCard
)
router.post('/show-by-report', auth.user, controller.showByReportId)
router.post('/store', auth.user, validation.store, controller.storeReport)
router.put('/:id/update', auth.user, validation.update, controller.updateReport)
router.delete('/:id', auth.user, controller.deleteReport)

module.exports = router
