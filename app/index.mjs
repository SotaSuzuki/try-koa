import Koa from 'koa'

const app = new Koa()

// ctx.hello で呼び出せる
app.context.hello = 'Hello, world!'

// X-Response-Time を追加
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// Logger
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async ctx => {
  // ctx.throw(400, 'name required') // throw 400 error Bad Request
  ctx.body = ctx.hello // => Hello, world!
})

app.listen(3000, () => {
  console.log('listen to port 3000\n', `env: ${app.env}`)
})
// It is simply sugar for following
// http.createServe(app.callback()).listen(3000)
