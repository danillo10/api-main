const path = require('path')
const { promisify } = require('util')
const fs = require('fs')

class Upload {
  constructor(data) {
    this.data = data
  }

  delete() {
    if (this.data.filename) {
      promisify(fs.unlink)(
        path.resolve(
          __dirname,
          '..',
          '..',
          'public',
          'media',
          this.data.filename
        )
      )
    }
  }
}

module.exports = Upload
