// miniprogram/pages/index/index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数据
    bannerData: [
      {
        imgUrl: 'cloud://medremangement-cloud-8bn8d3d8486.6d65-medremangement-cloud-8bn8d3d8486-1303981533/bannerimg/1.jpg'
      },
      {
        imgUrl: 'cloud://medremangement-cloud-8bn8d3d8486.6d65-medremangement-cloud-8bn8d3d8486-1303981533/bannerimg/2.png'
      },
      {
        imgUrl: 'cloud://medremangement-cloud-8bn8d3d8486.6d65-medremangement-cloud-8bn8d3d8486-1303981533/bannerimg/3.jpg'
      }
    ],

    //轮播图配置
    swiperOptions: {
      //显示面板指示点
      indicatorDots: true,

      //未选中指示点颜色
      indicatorColor: '#fff',

      //选中指示点颜色
      indicatorActiveColor: '#165dad',

      //开启自动轮播
      autoplay: true,

      //每隔一定时间切换一张图片, 单位为：ms
      interval: 3000,

      //衔接滑动
      circular: true
      
    },

     //科室数据
     asideData: [
    ],

    //病类数据
    diseaseData: [],
   
    collectionData:''

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    //获取初始科室数据
    this.getasideData();

  },

  //切换侧边栏菜单
  toggleAsideMenu: function (e) {
    //e: 事件对象
    // console.log('e ==> ', e);
    
    //如果当前选中, 则不做任何事情
    if (e.currentTarget.dataset.active) {
      console.log('拦截');
      return;
    }

    for (let i = 0; i < this.data.asideData.length; i++) {
      if (this.data.asideData[i].isActive) {
        this.data.asideData[i].isActive = false;
        break;
      }
    }

    this.data.asideData[e.currentTarget.dataset.index].isActive = true;

    this.setData({
      asideData: this.data.asideData,
      collectionData: e.currentTarget.dataset.name
    })
    //获取科室病类数据
    this.getDisease(e.currentTarget.dataset.value);

  }, 

  //获取科室数据
  getasideData: function(){
    //加载提示
    wx.showLoading({
      title: '加载中...',
      })
    wx.cloud.callFunction({
      config:{ env: 'medremangement-cloud-8bn8d3d8486' },
      name:'get_departments',
      data:{},    
      success: res => {
        // 关闭加载提示
        wx.hideLoading();
        console.log('res ==> ', res);
        this.setData({
          asideData: res.result.data
        })
      },
      fail: err => {
        // 关闭加载提示
        wx.hideLoading();
        console.log('出错了 err ==> ', err);
      }
    })
  },

  //获取病类数据
  getDisease: function (name) {
    //加载提示
     wx.showLoading({
       title: '加载中...',
       })     
    //调用云函数【get_disease】获取疾病
    wx.cloud.callFunction({
      config:{ env: 'medremangement-cloud-8bn8d3d8486' },
      name: 'get_disease',
      //参数
      data: {
      name: name
      },
      success: res => {
        // 关闭加载提示
        wx.hideLoading();
        console.log('res ==> ', res);
        this.setData({
          diseaseData: res.result.data
        })
      },
      fail: err => {
        // 关闭加载提示
        wx.hideLoading();
        console.log('出错了 err ==> ', err);
      }
    })
  },

  //查看病例
  goDetail: function (e) {
    var name = e.currentTarget.dataset.name;
    console.log('name ==> ', name);
    console.log('collection ==> ', this.data.collectionData);
    wx.navigateTo({
      url: '../detaillist/detaillist?disease=' + name +'&department=' +this.data.collectionData
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