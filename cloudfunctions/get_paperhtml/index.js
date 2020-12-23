
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'medremangement-cloud-8bn8d3d8486',
  throwOnNotFound: false
})
//获取数据库引用
var db = cloud.database();
const MAX_LIMIT = 50
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 先取出集合记录总数
    const countResult = await db.collection('papers').count()
    console.log(countResult)
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      //get()操作返回的是Promise对象，每获取一个Promise就压栈进入tasks数组
      const promise = db.collection('papers').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    console.log(tasks)
    console.log(await Promise.all(tasks))
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
    //paper = await db.collection('papers').get();
    //return paper.data
  } catch (err) {
    console.log('云函数调用失败 err ==> ', err);
  }

}

