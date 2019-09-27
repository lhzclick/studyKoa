const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const verify = Promise.promisify(jwt.verify);
let secret = 'jwt demo'

async function check(ctx, next) {
    let url = ctx.request.url;
    console.log(url)
    if(url == "/login") {
        await next();
    }else {
        let token = ctx.header.token;
        if(token){
            let payload = await verify(token,secret);
            let {time, timeout} = payload;
            let dataTime = new Date().getTime();
            if(dataTime - time <= timeout) {
                //存在且未过期
                await next()
            }else{
                //过期
                ctx.body = {
                    err: -1,
                    msg:'token 已过期'
                };
            }
        }else{
            ctx.body = {
                err: -1,
                msg:'token不存在，请重新登录'
            };
        }        
    }
}

module.exports = check