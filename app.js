// const http = require('http');
// const https = require('https');
const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
const router = new Router();

const render = require('koa-ejs');
const path = require('path');
// logger

// app.use(async (ctx, next) => {
//   await next();
//   const rt = ctx.response.get('X-Response-Time');
//   console.log(`${ctx.method} ${ctx.url} - ${rt}`);
// });

// // x-response-time

// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   ctx.set('X-Response-Time', `${ms}ms`);
// });

// // response

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

render(app, {
    root: path.join(__dirname,"views"),
    layout: "template",
    viewExt: "html",
    cache: false,
    debug: false,
    async: true
})

const users = ["u1", "u2", "u3", "u4"];

router.get("/users", async ctx =>{
    await ctx.render("index", {
        users: users
    });
});


router.post("/pk/:id", ctx => {
    ctx.body = ctx.request.req;
    return (ctx.status = 201);
});

app.use(router.routes()).use(router.allowedMethods());



app.listen(3000);
// http.createServer(app.callback()).listen(3000);
// https.createServer(app.callback()).listen(3001);