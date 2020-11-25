// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'medremangement-cloud-8bn8d3d8486'
})
//获取数据库引用
var db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}