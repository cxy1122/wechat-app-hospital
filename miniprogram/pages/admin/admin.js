//admin.js
//获取应用实例
const app = getApp()
wx.cloud.init()
Page({
  data: {
    ne:[],
    username: '',
    password: '',
 
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onLoad: function () {
   
  },
 
  // 获取输入账号 
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
 
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
 
  // 登录处理
  login: function () {
    var that = this;
    const db = wx.cloud.database({
      env: 'medremangement-cloud-8bn8d3d8486'
    })
    db.collection('user').where({
      _id: '0288fce75fba35900032bb09719716b5'
    }).get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          ne: res.data
        })
        console.log(this.data.ne)
      }
    }) 
    setTimeout(function () {
    that.loginin();
    }, 500) 
      // wx.request({
      //   url: app.globalData.globalReqUrl +'/login/login', // 仅为示例，并非真实的接口地址
      //   method: 'post',
      //   data: {
      //     username: that.data.username,
      //     password: that.data.password
      //   },
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded' // 默认值
      //   },
      //   success(res) {
      //     if (res.data.code == "OK") {
      //       var unitName = res.data.data.User.unitName;
      //       var unitId = res.data.data.User.unitId;
      //       wx.setStorageSync('unitId', unitId);
      //       wx.setStorageSync('unitName', unitName);
      //       wx.switchTab({
      //         url: '../overviewData/realTimeData'
      //       })
      //     } else {
      //       wx.showToast({
      //         title: res.data.message,
      //         icon: 'none',
      //         duration: 2000
      //       })
      //     }
      //   }
      // })   
  },
  loginin(){
    if (this.data.username.length == 0 || this.data.password.length == 0) {   
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      try{
      if(this.data.username == this.data.ne[0].name && this.data.password == this.data.ne[0].password){
        wx.navigateTo({
          url: '../actionlist/actionlist'
        })
      }
      else{   
        wx.showToast({
          title: '账号与密码不匹配',
          icon: 'none',
          duration: 2000
        })
      }}catch(err) {
        var errmess = "err ==> "+err
        console.log(errmess)
        console.log('err ==> ', err);
      }finally{
        // if(errmess=="err ==> TypeError: Cannot read property 'name' of undefined"){
        //  wx.navigateTo({
        //    url: '../actionlist/actionlist'
        //   })
        }
      }

  }

})
