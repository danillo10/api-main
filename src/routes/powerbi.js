const router = require('express').Router()
const PowerBiController = require('../controllers/PowerBiController')
const validation = require('../middlewares/validations/powerby')
const auth = require('../middlewares/auth')

const controller = new PowerBiController()

router.get('/groups/:id/reports', auth.user, controller.loadPowerBiReports)
router.get('/groups', auth.user, controller.loadPowerBiGroups)
router.post(
  '/reports/aad',
  auth.user,
  validation.loadReportAad,
  controller.loadReportAad
)
router.post(
  '/reports/embed',
  auth.user,
  validation.loadReportEmbed,
  controller.loadReportEmbed
)

module.exports = router
