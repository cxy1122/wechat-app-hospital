// pages/delete_info/delete_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['新增科室','科室1','科室2','科室3','科室4'],/**这边要从数据库中读取科室的id和名称 */
    objectArray: [
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
    multiArray: [['科室1', '科室2'], ['疾病1', '疾病2', '疾病3', '疾病4', '疾病5']],
    objectMultiArray: [
      [
        {
          id: 1,
          name: '科室1'
        },
        {
          id: 2,
          name: '科室2'
        }
      ], [
        {
          id: 1,
          name: '疾病1'
        },
        {
          id: 2,
          name: '疾病2'
        },
        {
          id: 3,
          name: '疾病3'
        },
        {
          id: 4,
          name: '疾病4'
        },
        {
          id: 5,
          name: '疾病5'
        }
      ], 
    ],
    multiIndex: [0, 0],
    listdata:[
     {name:"a1",article_id: 1},
     {name:"a2",article_id: 2},
     {name:"a3",article_id: 3}
    ]
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  submit1(e){
/**删除科室，触发二次确认 */
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
   
      switch(data.multiIndex[0]){
        case 0:
        data.multiArray[1] = ['疾病1','疾病2'];
        break;
        case 1:
        data.multiArray[1] = ['疾病3','疾病4','疾病5'];
        break;
        default:
      };
    this.setData(data);
  },
  submit2(e){
    /**删除疾病，触发二次确认 */
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