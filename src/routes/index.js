const router = require('express').Router()

router.use('/admin', require('./admins'))
router.use('/firms', require('./firms'))
router.use('/users', require('./users'))
router.use('/users-groups', require('./users-groups'))
router.use('/accounts', require('./accounts'))
router.use('/reports', require('./reports'))
router.use('/powerbi', require('./powerbi'))
router.use('/report-cards', require('./reportCards'))

router.get('/', (req, res) => res.send({ message: 'Analyticdbi api...' }))
router.all('*', (req, res) =>
  res.status(404).send({ message: 'Rota inexistente!' })
)

module.exports = router
