//app.js
App({
  data:{
    richTextContents:{}
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'medremangement-cloud-8bn8d3d8486',
        traceUser: true,
      })
    }
    this.globalData = {}
  }
})
