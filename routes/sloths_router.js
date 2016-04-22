const slothsRouter = module.exports = require('koa-router')();
const koaBody = require('koa-body')();
const Sloth = require(__dirname + '/../models/sloth.js');
const handleErr = require(__dirname + '/../lib/handle_err');

slothsRouter.post('/sloths', koaBody, function* () {
  var newSloth = new Sloth(this.request.body);
  yield newSloth.save((err, data) => {
    if (err) return handleErr(err, this.response.body);
    this.response.body = data;
  });
});

slothsRouter.get('/sloths', function* () {
  yield Sloth.find(null, (err, data) => {
    if (err) return handleErr(err, this.response.body);
    this.response.body = data;
  });
});
