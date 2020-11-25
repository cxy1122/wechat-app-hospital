const app = getApp();
let richText = null;  //富文本编辑器实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    department_name:{},
    disease_name:{},
    multiArray: [],
    multiIndex: [],
    //文章html
    htmlData:[],
    fileid:{},
    title:{}
  },  
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var disease_key=0;
    var diseaseList=this.data.diseaseList;
    var select_key=e.detail.value[1];
    var real_key = select_key ;
    if (real_key < disease_key) {
      this.setData({
        disease_name: 0
      })
    } else {
      this.setData({
        disease_name: diseaseList[real_key]['name']　　　　　　
      })
    }
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    var department_name_session = this.data.department_name; 
    switch(e.detail.column){
      case 0:
        var departmentList = this.data.departmentList;
        var department_name = departmentList[e.detail.value]['name'];
        if(department_name_session!=department_name){
          this.getDisease(department_name);
        }
        data.multiIndex[1] = 0;
        break;
      };
    this.setData(data);
  },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getdepartmentData();    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 编辑器初始化完成时触发，可以获取组件实例
  onEditorReady() {
    console.log('[onEditorReady callback]')
    richText = this.selectComponent('#richText'); //获取组件实例
  },
  passwordInput: function (e) {
    this.setData({
      title: e.detail.title
    })
    console.log(title)
  },
  //获取科室数据
  getdepartmentData: function(){
    //加载提示
    wx.showLoading({
      title: '加载中...',
      })
    wx.cloud.callFunction({
      name:'get_departments',
      config:{ env: 'medremangement-cloud-8bn8d3d8486' },      
      data:{},    
      success: res => {
        // 关闭加载提示
        wx.hideLoading();
        console.log('res ==> ', res);
        var departmentList = res.result.data;
        var departmentArr = departmentList.map(item => {
          return item.name;
        });
        this.setData({
          multiArray:[departmentArr,[]],
          departmentList,
          departmentArr
        })
        var default_department = departmentArr[0];
        if(default_department)
        {
          this.getDisease(default_department);
        }
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
    var that=this;
    if (name) {
      this.setData({
        department_name: name
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
        var diseaseList = res.result.data;
        var diseaseArr = diseaseList.map(item =>{
          return item.name;
        })
        var departmentArr = this.data.departmentArr;
        that.setData({
          multiArray:[departmentArr,diseaseArr],
          diseaseArr,
          diseaseList
        })
      },
      fail: err => {
        // 关闭加载提示
        wx.hideLoading();
        console.log('出错了 err ==> ', err);
      }
    })
  }
  },

  // 获取输入标题 
  TitleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
    console.log(this.data.title)
  },

  //设置富文本内容
  setContents(rechtext) {
    this.editorCtx.setContents({
      html: rechtext,
      success: res => {
        console.log('[setContents success]', res)
      }
    })
  },

  //撤销
  undo() {
    console.log('[undo callback]')
  },

  //恢复
  restore() {
    console.log('[restore callback]')
  },

  //清空编辑器内容
  clear() {
    this.editorCtx.clear({
      success: res => {
        console.log("[clear success]", res)
      }
    })
  },

  //清空编辑器事件
  clearBeforeEvent(){
    console.log('[clearBeforeEvent callback]')
    wx.showModal({
      cancelText: '取消',
      confirmText: '确认',
      content: '确认清空编辑器内容吗？',
      success: (result) => {
        if(result.confirm){
          richText.clear();
        }
      },
      fail: (res) => {},
    })
  },

  //清空编辑器成功回调
  clearSuccess(){
    console.log('[clearSuccess callback]')
  },

  //清除当前选区的样式
  removeFormat() {
    this.editorCtx.removeFormat();
  },

  //插入图片
  insertImageEvent() {
    var that=this;
    wx.chooseImage({
      count: 1,
      success: res => {
        const path = res.tempFilePaths[0];
        const cloudpath = 'picture/'+ new Date().getTime() +path.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath: cloudpath,
          filePath: path, // 文件路径
          success: res => {
            this.setData({
              fileid: res.fileID
            })
            console.log("img=>"+res.fileID)
          },
          fail: err => {
          }
        })
        wx.showLoading({
          title: '图片加载中...',
        })   
        setTimeout(function () {
        //调用子组件方法，图片应先上传再插入，不然预览时无法查看图片。
        console.log("img=>"+that.data.fileid)
        richText.insertImageMethod(that.data.fileid).then(res => {
          console.log('[insert image success callback]=>', res)
        }).catch(res => {
          console.log('[insert image fail callback]=>', res)
        });
        }, 2000) 
        wx.hideLoading();
      }
    })
  },

  //show文本工具栏
  showTextTool() {
    this.setData({
      textTool: !this.data.textTool
    })
  },

  //编辑器聚焦时触发
  bindfocus(res) {
    let {
      value
    } = res.detail;
    // console.log('[bindfocus callback]=>', value)
  },

  //编辑器失去焦点时触发
  bindblur(res) {
    let {
      value
    } = res.detail;
    // console.log('[bindblur callback]=>', value)
  },

  //编辑器输入中时触发
  bindinput(res) {
    let {
      value
    } = res.detail;
    //console.log('[bindinput callback]=>', value)
    app.data.richTextContents = value.detail.html;
  },

  //预览富文本
  preview(){
    wx.navigateTo({
      url: `../previewpaper/previewpaper`,
    })
  },

  //保存，获取编辑器内容
  getEditorContent(res) {
    var that=res;
    var thiss=this;
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'提示',
      content:'确定要上传该文章？',
      success : function(res){
        if(res.confirm){
          console.log('用户点击确定');
          let {
            value
          } = that.detail;
          wx.showToast({
            title: '上传成功！',
            icon: 'success',
          })
          thiss.data.htmlData = value.html,
          console.log('[getEditorContent callback]=>',thiss.data.htmlData);
          thiss.uploadpaper();
        }
        else if (res.cancel) {
          console.log('用户点击取消')
         }
      }
    })
  },

  //调用云函数上传文章html到数据库
  uploadpaper(){
    //加载提示
      console.log('dise=>'+this.data.disease_name);
      console.log('depart=>'+this.data.department_name),   
      console.log(this.data.title)              
      //调用云函数上传文章html
       wx.cloud.callFunction({
         config:{ env: 'medremangement-cloud-8bn8d3d8486' },
         name: 'set_paper',
         //参数
         data: {
           html: this.data.htmlData,
           disease:this.data.disease_name,
           department:this.data.department_name,
           titlename:this.data.title
          },
          success: res => {
            // 关闭加载提示
            console.log('上传成功');
          },
          fail: err => {
            // 关闭加载提示
            console.log('出错了 err ==> ', err);
          }
        })
  },
  
})
