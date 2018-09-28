// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const DB = cloud.database()
const DATE = DB.collection('date')

// 云函数入口函数
exports.main = async (event, context) => {
    return new Promise((resolve, reject) => {
        DATE.doc(event._id)
            .update({
                data: {
                    disabled: event.result
                }
            })
            .then(res => {
                resolve(res)
                // console.log('云函数：' + res)
            })
            .catch(error => {
                reject(error)
            })
    })
}
