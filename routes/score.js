const router = require('koa-router')()
const userService = require('./mysqlConfig')
var cors = require('koa2-cors')

// 跨域解决
router.use(cors())
router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})
router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})
router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

// 测试接口
router.post('/addScore', async (ctx, next) => {
    const r_body = ctx.request.body
    await userService.addScore(r_body)
        .then((data) => {
            if (r_body.name&&r_body.age&&r_body.sex&&r_body.score&&r_body.type) {
              ctx.body = {
                code: 200,
                msg: 'SUCCESS',
                data: data
              }
            } else {
              ctx.body = { err: -1, msg: '请录入完整信息' }
            }
        }).catch((err) => {
            ctx.body = {
                err: -2,
                msg: err,
            }
        })
})
router.post('/getScore', async (ctx, next) => {
    const r_body = ctx.request.body
    await userService.getScore(r_body)
        .then((data) => {
            if(r_body.pageNo&&r_body.pageSize){
                ctx.body = {
                    code: 200,
                    msg: 'SUCCESS',
                    data: data
                }
            }else{
                ctx.body = {
                    err: -3,
                    msg: '请传入pageNo和pageSize',
                }
            }
            
        }).catch((err) => {
            ctx.body = {
                err: -2,
                msg: err,
            }
        })
})


module.exports = router