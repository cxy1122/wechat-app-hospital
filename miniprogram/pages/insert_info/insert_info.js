// pages/insert_info/insert_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:null,
    array:['新增科室','科室1','科室2','科室3','科室4'],/**这边要从数据库中读取科室的id和名称 */
    objectArray: [
      {
        id: 0,
        name: '新增科室'
      },
      {
        id: 1,
        name: '科室1'
      },
      {
        id: 2,
        name: '科室2'
      },
      {
        id: 3,
        name: '科室3'
      },
      {
        id: 4,
        name: '科室4'
      }
    ],
    index: 0,
  },

  bindKeyInput: function (e) {
    this.setData({/*获取input的值 */
      inputValue: e.detail.value  
    })
  },
  submit(e){
/*这里提交新增的信息，提交完给个toast */

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
   // if(index==0){
      /**选择了新增科室，要把下面输入框中的值作为科室存储 */
   // }else{
      /*把下面输入框中的值存到对应科室中*/
   // }
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