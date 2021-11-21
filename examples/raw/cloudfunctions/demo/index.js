const app = require('./app')

exports.main = async (event, context) => {
  return await app.serve(event, context)
}
