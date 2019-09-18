var mysql = require('mysql2');

const pool = mysql.createPool({
    host: '118.89.34.119',
    user: 'liuhu',
    database: 'study',
    password: 'liuhu423',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

let allServices = {
    query: function (sql, values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {

                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    },
    findUserData: function (name) {
        let _sql = `select * from test`
        return allServices.query(_sql)
    },


    // 增
    addScore:function(data){
        const jobId = Math.floor(Math.random() * 1000)+(new Date()).getTime() +''
        const createTime = (new Date()).getTime()
        const _sql = `INSERT INTO score (name,age,sex,score,type,jobId,createTime) VALUES ('${data.name}', ${data.age},'${data.sex}',${data.score},'${data.type}','${jobId}',${createTime})`
        return allServices.query(_sql)
    },
    // 查
    getScore:function(data){
        let _sql = ''
        const num1 = (data.pageNo-1)*data.pageSize
        if(data.type){
            _sql = `select * from score where type='${data.type}' limit ${num1}, ${data.pageSize}`
        }else{
            _sql = `select * from score limit ${num1}, ${data.pageSize}`
        }
        return allServices.query(_sql)
    }
}

module.exports = allServices