// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'medremangement-cloud-8bn8d3d8486'
})
//获取数据库引用
var db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    //await: 等待结果返回，必须配合async使用
    return await db.collection('departments').get();    
  } catch (err) {
    console.log('err ==> ', err);
  }

}