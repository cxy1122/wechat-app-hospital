// pages/detaillist/detaillist.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //文章数据
    listData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpaperlist();
  },

  //获取病类数据
  getpaperlist: function () {

    //加载提示
    wx.showLoading({
      title: '加载中...',
    })
  
    //调用云函数【get_paperlist】获取文章
    wx.cloud.callFunction({
      config:{ env: 'medremangement-cloud-8bn8d3d8486' },
      name: 'get_paperlist',
      //参数
      data: {
        disease:'永峥医聊',
        department:'永峥医聊'
      },
  
      success: res => {
        // 关闭加载提示
        wx.hideLoading();
        console.log('res ==> ', res);
        this.setData({
          listData: res.result.data.reverse()
        })

        console.log(this.data.listData.length);
        if(this.data.listData.length==0)
        {
          wx.showToast({
            title:'永峥医聊还没有任何文章!',
            icon:'none',
            duration:2000
          }
          )
        }
      },
      fail: err => {
        // 关闭加载提示
        wx.hideLoading();
        console.log('出错了 err ==> ', err);
      }
    })
  },
  
  //查看文章
  goPaper: function (e) {
    var html = encodeURIComponent(e.currentTarget.dataset.html);
    wx.navigateTo({
      url: '../detail/detail?html=' + html 
    })
    
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
    this.getpaperlist();
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