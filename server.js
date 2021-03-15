const Koa = require('koa')
const logger = require('koa-morgan')
const Router = require('koa-router')
const bodyParser = require('koa-body')()

const server = new Koa()
const router = new Router()

router.get('/', ctx => {
  ctx.body = 'I am root!'
})

function *printHelloMessage() {
    this.status = 200;
    this.body = "Hey there!";
 }
router.get('/hello', printHelloMessage);

router.get('/second_route', ctx => {
  ctx.body = 'I am second_route'
})

router.post('/something', ctx => {
  ctx.body = {
    something: 'something here'
  }
})

router.post('/comments', bodyParser, async ctx => {
    const comment = await Comment.create(ctx.request.body.comment)
    ctx.body = {
      comment: comment
    }
  })

server
  .use(logger('tiny'))
  .use(router.routes())
  .listen(3001)
