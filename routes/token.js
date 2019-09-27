//      JSON WEB TOKEN 验证接口  
const router = require('koa-router')()
const userService = require('./mysqlConfig')
var cors = require('koa2-cors')

// jwt
const jwt = require('jsonwebtoken')
const secret = 'jwt demo'

// 跨域解决
router.use(cors())

// 
router.post('/login', async (ctx, next) => {
    const r_body = ctx.request.body
    await userService.login(r_body)
        .then((data) => {
            console.log(data)
            let isLogin = false
            data.map((item,i)=>{
                if(item.userName==r_body.userName&&item.password==r_body.password){
                    isLogin = true
                }
            })
            // 用户名，密码验证通过
            if(isLogin){
                let userToken = {
                    userName: r_body.userName,
                    password: r_body.password
                }
                let payload = {userName:r_body.userName,time:new Date().getTime(),timeout:1000*60*60*2}
                const token = jwt.sign(payload, secret)
                ctx.body = {
                    code: 200,
                    msg: 'LOGIN SUCCESS',
                    data: {
                        token:token
                    }
                }
            }else{
                ctx.body = {
                    err: -1,
                    msg: '用户名或密码错误',
                }
            }
    
    }).catch((err) => {
        ctx.body = {
            err: -2,
            msg: err,
        }
    })
})

//  jwt测试接口
router.post('/userInfo', async (ctx, next) => {
    ctx.body = {
        message: 'success',
        code: 200
    }
    // const token = ctx.header.token  // 获取jwt
    // if (token) {
    //     try{
    //         let decode = jwt.verify(token, secret)
    //         ctx.body = {
    //             message: 'success',
    //             code: 200
    //         }
    //     }catch(err){
    //         ctx.body = {
    //             message: 'token 错误',
    //             code: -2
    //         }
    //     }
        
    // } else {
    //     ctx.body = {
    //         message: 'token 错误',
    //         code: -1
    //     }
    // }
})




module.exports = router