//      分数录入请求接口  
const router = require('koa-router')()
const userService = require('./mysqlConfig')
var cors = require('koa2-cors')
// jwt
const jwt = require('jsonwebtoken')
const secret = 'jwt demo'

// 跨域解决
router.use(cors())

// 分数增加
router.post('/addScore', async (ctx, next) => {
    const r_body = ctx.request.body
    const token = ctx.header.token
    if (token) {
        // token校验通过
        try {
            let decode = jwt.verify(token, secret)
            await userService.addScore(r_body)
                .then((data) => {
                    if (r_body.name && r_body.age && r_body.sex && r_body.score && r_body.type) {
                        ctx.body = {
                            code: 200,
                            msg: 'SUCCESS',
                            data: data
                        }
                    } else {
                        ctx.body = {
                            err: -1,
                            msg: '请录入完整信息'
                        }
                    }
                }).catch((err) => {
                    ctx.body = {
                        err: -2,
                        msg: err,
                    }
                })
        } catch (err) {
            // token校验未通过
            ctx.body = {
                msg: 'token 错误',
                err: -101
            }
        }
    } else {
        // token 不存在
        ctx.body = {
            msg: 'token不存在',
            err: -101
        }
    }

})
// 分数获取
router.post('/getScore', async (ctx, next) => {
    const r_body = ctx.request.body
    const token = ctx.header.token
    if (token) {
        // token校验通过
        try {
            let decode = jwt.verify(token, secret)
            let _data = {}
            await userService.getScore(r_body)
                .then((data) => {
                    if (r_body.pageNo && r_body.pageSize) {
                        
                        _data.list = data
                    } else {
                        ctx.body = {
                            err: -1,
                            msg: '请传入pageNo和pageSize',
                        }
                    }

                }).catch((err) => {
                    ctx.body = {
                        err: -2,
                        msg: err,
                    }
                })
            await userService.getTotal(r_body)
            .then((data) => {
                if (r_body.pageNo && r_body.pageSize) {
                    
                    _data.total = data[0]['COUNT(*)']
                } else {
                    ctx.body = {
                        err: -1,
                        msg: '请传入pageNo和pageSize',
                    }
                }

            }).catch((err) => {
                ctx.body = {
                    err: -2,
                    msg: err,
                }
            })
            ctx.body = {
                code: 200,
                msg: 'SUCCESS',
                data: _data
            }
        } catch (err) {
            // token校验未通过
            ctx.body = {
                msg: 'token 错误',
                err: -101
            }
        }

    } else {
        // token 不存在
        ctx.body = {
            msg: 'token不存在',
            err: -101
        }
    }
})
// 分数删除
router.post('/deleteScore', async (ctx, next) => {
    const r_body = ctx.request.body
    const token = ctx.header.token
    if (token) {
        // token校验通过
        try {
            let decode = jwt.verify(token, secret)
            await userService.deleteScore(r_body)
                .then((data) => {
                    if (r_body.jobId) {
                        ctx.body = {
                            code: 200,
                            msg: 'SUCCESS',
                            data: data
                        }
                    } else {
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
        } catch (err) {
            // token校验未通过
            ctx.body = {
                msg: 'token 错误',
                err: -101
            }
        }
    } else {
        // token 不存在
        ctx.body = {
            msg: 'token不存在',
            err: -101
        }
    }

})
// 分数编辑
router.post('/editScore', async (ctx, next) => {
    const r_body = ctx.request.body
    const len = Object.keys(r_body).length
    const token = ctx.header.token
    if (token) {
        // token校验通过
        try {
            let decode = jwt.verify(token, secret)
            if (len > 1) {
                await userService.editScore(r_body)
                    .then((data) => {
                        if (r_body.jobId) {
                            ctx.body = {
                                code: 200,
                                msg: 'SUCCESS',
                                data: data
                            }
                        } else {
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
            } else {
                ctx.body = {
                    err: -4,
                    msg: '未传入修改参数',
                }
            }
        } catch (err) {
            // token校验未通过
            ctx.body = {
                msg: 'token 错误',
                err: -101
            }
        }
    } else {
        // token 不存在
        ctx.body = {
            msg: 'token不存在',
            err: -101
        }
    }


})



//  验证token
/* const token = ctx.header.token
    if (token) {
        // token校验通过
        try {
            let decode = jwt.verify(token, secret)
        } catch (err) {
            // token校验未通过
            ctx.body = {
                msg: 'token 错误',
                err: -101
            }
        }
    } else {
        // token 不存在
        ctx.body = {
            msg: 'token不存在',
            err: -101
        }
    }  */

module.exports = router