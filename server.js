const koa = require('koa');
const mongoose = require('mongoose');

const app = koa();
const PORT = process.env.PORT || 3000;
const slothsRouter = require(__dirname + '/routes/sloths_router');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/slothDB');

app.use(slothsRouter.routes());

app.listen(PORT, () => console.log('server up on ' + PORT));
