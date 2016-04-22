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

slothsRouter.get('/sloths/:id', function* () {
  yield Sloth.findOne({ _id: this.params.id }, (err, data) => {
    if (err) return handleErr(err, this.response.body);
    this.response.body = data;
  });
});

slothsRouter.put('/sloths/:id', koaBody, function* () {
  var slothData = this.request.body;

  yield Sloth.findOne({ _id: this.params.id }, (err, doc) => {
    if (err) return handleErr(err, this.response.body);
    doc.name = slothData.name;
    doc.toes = slothData.toes;
    doc.strength = slothData.strength;
    doc.save(() => {
      this.response.body = 'sloth updated';
    });
  });

});

slothsRouter.del('/sloths/:id', function* () {
  yield Sloth.remove({ _id: this.params.id }, (err) => {
    if (err) return handleErr(err, this.response.body);
    this.response.body = 'sloth removed';
  });
});
