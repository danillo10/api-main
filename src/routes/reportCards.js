const router = require('express').Router()
const ReportCardController = require('../controllers/ReportCardController')
const validation = require('../middlewares/validations/reportCard')
const auth = require('../middlewares/auth')
const { upload } = require('../middlewares/uploads/images')

const controller = new ReportCardController()

router.get('/:id', auth.user, controller.showReportCard)
router.post('/list-by-firm', auth.user, controller.listReportCardByFirm)
router.post('/store', auth.user, validation.store, controller.storeReportCard)
router.put(
  '/:id/update',
  auth.user,
  validation.update,
  controller.updateReportCard
)
router.put(
  '/:id/upload',
  auth.user,
  upload('file'),
  controller.uploadReportCardImage
)
router.delete('/:id', auth.user, controller.deleteReportCard)

module.exports = router
