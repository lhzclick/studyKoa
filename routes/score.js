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

router.post('/deleteScore', async (ctx, next) => {
    const r_body = ctx.request.body
    await userService.deleteScore(r_body)
        .then((data) => {
            if(r_body.jobId){
                ctx.body = {
                    code: 200,
                    msg: 'SUCCESS',
                    data: data
                }
            }else{
                ctx.body = {
                    err: -3,
                    msg: '请传入jobId',
                }
            }
            
        }).catch((err) => {
            ctx.body = {
                err: -2,
                msg: err,
            }
        })
})

router.post('/editScore', async (ctx, next) => {
    const r_body = ctx.request.body
    const len = Object.keys(r_body).length
    if(len>1){
        await userService.editScore(r_body)
        .then((data) => {
            if(r_body.jobId){
                ctx.body = {
                    code: 200,
                    msg: 'SUCCESS',
                    data: data
                }
            }else{
                ctx.body = {
                    err: -3,
                    msg: '请传入jobId',
                }
            }
            
        }).catch((err) => {
            ctx.body = {
                err: -2,
                msg: err,
            }
        })
    }else{
        ctx.body = {
            err: -4,
            msg: '未传入修改参数',
        }
    }
    
})

// 测试接口
router.post('/addStatistics', async (ctx, next) => {
    const r_body = ctx.request.body
    await userService.addStatistics(r_body)
        .then((data) => {
            if (r_body) {
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
router.post('/getStatistics', async (ctx, next) => {
    const r_body = ctx.request.body
    let _data = {}
    if (r_body.pageNo && r_body.pageSize) {
        await userService.getStatistics(r_body)
        .then((data) => {
            _data.list = data
        }).catch((err) => {
            ctx.body = {
                err: -3,
                msg: err,
            }
        })
        await userService.getStatisticsTotal(r_body)
        .then((data) => {
            _data.total = data[0]['COUNT(*)']

        }).catch((err) => {
            ctx.body = {
                err: -2,
                msg: err,
            }
        })
        ctx.body = {
            code: 200,
            msg: '查询成功',
            data: _data
        }
    } else {
        ctx.body = {
            err: -1,
            msg: '参数错误',
        }
    }
})


module.exports = router