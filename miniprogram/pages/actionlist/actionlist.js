// pages/actionlist/actionlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    button_value:null
  },

  button_delete(e){
    wx.navigateTo({
      url: '/pages/delete_info/delete_info',
    })
  },
  button_zip(e){
    wx.showLoading({
      title: '下载中...',
    })
    // wx.cloud.downloadFile({
    //   fileID: 'cloud://medremangement-cloud-8bn8d3d8486.6d65-medremangement-cloud-8bn8d3d8486-1303981533/papers/皮肤科/荨麻疹/1.html',
    //   success: res=>{  
    //   // get temp file path      
    //   const path = res.tempFilePath;
    //   console.log(path)
    //   wx.downloadFile({
    //     url: path, //仅为示例，并非真实的资源
    //     filePath: wx.env.USER_DATA_PATH+"/res",
    //     success: res=> {
    //       console.log('下载成功'),
    //       wx.hideLoading();
    //     },
    //     fail: err => {
    //       console.log(err)
    //     }           
    //   })
    // },
    // fail: err => {
    //     // handle error
    // }
    // })

    //调用云函数【get_paperhtml】获取文章
    wx.cloud.callFunction({
      config:{ env: 'medremangement-cloud-8bn8d3d8486' },
      name: 'get_paperhtml',
      data:{},  
      success: res => {
        // 关闭加载提示
        // wx.hideLoading();
        console.log('res ==> ', res.result.data);
        //文件管理器下载文章到本地
        const fsm = wx.getFileSystemManager()
        for(var i in res.result.data){
          var path = wx.env.USER_DATA_PATH+'/'+res.result.data[i].department+'-'+res.result.data[i].disease+'-'+res.result.data[i].titlename+'.html'
          try{
              // filePath: /Android/data/com.tencent.mm/MicroMsg/wxanewfiles/目录
              fsm.writeFile({
              filePath:path,
              data:res.result.data[i].html,
              encoding:'utf-8',
              success: function (res){        //成功提示
                console.log(res)
                wx.showToast({
                  title: '下载成功...',
                })
                // wx.openDocument({
                //   filePath: path,
                //   success: function (res) {
                //     console.log('打开文档成功')
                //   },
                //   fail:function (err){
                //     console.log('打开文档失败'+err)
                //   }
                // })
              }
            })            
          }catch (err) {
              //失败提示
              wx.showToast({
              title: '下载失败...',
            })
            console.log('err ==> ', err);
          }
        }
        //console.log(res.result)
      },
      fail: err => {
        // 关闭加载提示
        wx.hideLoading();
          //失败提示
          wx.showToast({
          title: '下载失败...',        
        })
        console.log('数据加载失败 err ==> ', err);
      }
    })
  },
  button_upload(e){
    wx.navigateTo({
      url: '/pages/upload_article/upload_article',
    })
  },
  button_update(e){
    wx.navigateTo({
      url: '/pages/update_info/update_info',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})