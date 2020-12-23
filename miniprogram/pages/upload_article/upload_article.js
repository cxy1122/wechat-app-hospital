const app = getApp();
let richText = null;  //富文本编辑器实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    department_name:{},
    disease_name:'荨麻疹',
    multiArray: [],
    multiIndex: [],
    //文章html
    htmlData:[],
    texthtmlData:[],
    fileid:{},
    title:'',
    date:'',
    update_article_obj: {},////
    update_article_html:'',
    title:'',
    isUpdate: false,
    index_dept:0,
    index_dise:0,
    text:'请先选择文章所属的科室与疾病',
    paperid:{}
  }, 
  bindPickerCancel: function(e){
    console.log("点击了取消")
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'警告',
      content:'您并没有选择当前值，请重新选择并点击确认,否则会发生错误!',
    })
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
    app.data.richTextContents='1',
    this.getdepartmentData();
    if(options.obj){////胡家欣修改部分start
      var obj = JSON.parse(decodeURIComponent(options.obj))
      this.setData({
        text:'点击此处来修改文章所属科室与疾病(如不修改则无需点击此处)',
        update_article_obj : obj,
        update_article_html: obj.texthtml,
        title : obj.titlename,
        isUpdate: true,
        index_dept: options.index1,
        index_dise: options.index2,
        disease_name: obj.disease,
        department_name: obj.department
      })   
      app.data.richTextContents='11111111111111111111111111111111111';
      console.log("测试一下obj的值"+ Object.keys(this.data.update_article_obj).length)
    }else{
      console.log("传值为空,不是修改文章")
      console.log("测试一下obj的值"+ Object.keys(this.data.update_article_obj).length)
    }///胡家欣修改部分end    
    this.setData({
      multiIndex: [this.data.index_dept, this.data.index_dise],
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 编辑器初始化完成时触发，可以获取组件实例
  onEditorReady() {
    console.log('编辑器初始化完成时触发2')
    console.log('编辑器初始化完成时触发结束2')
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
            wx.showLoading({
              title: '图片上传中...',
            })   
            this.setData({
              fileid: res.fileID
            })
            console.log("img=>"+res.fileID)
          },
          fail: err => {
          }
        })
        setTimeout(function () {
        //调用子组件方法，图片应先上传再插入，不然预览时无法查看图片。
        console.log("imgfileid=>"+that.data.fileid)
        richText.insertImageMethod(that.data.fileid).then(res => {
          console.log('[insert image success callback]=>', res)
        }).catch(res => {
          console.log('[insert image fail callback]=>', res)
        });
        wx.hideLoading();
        //设置上传时间为3s 网速慢或者图片大会出现上传失败的情况
        }, 3000) 
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
    app.data.richTextContents = value.detail.html;
    console.log('[bindinput callback]=>', app.data.richTextContents )
  },


  //保存，获取编辑器内容
  getEditorContent(res) {
    console.log("title=>"+this.data.title)
    if(this.data.title.length==0){
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if(app.data.richTextContents.length<23){
      wx.showToast({
        title: '文章内容不能少于15字！',
        icon: 'none',
        duration: 2000
      })
    }
    else{
    var that=res;
    var thiss=this;
    var showWarning = '确定要上传该文章？'
    if(this.data.isUpdate){
      showWarning = '确定要修改该文章所属科室、标题以及内容？（原内容将会被覆盖）'
    }
    console.log(app.data.richTextContents)
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'提示',
      content: showWarning,
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
          thiss.data.date = thiss.getThisDate();  
          thiss.data.htmlData = '<h2 id="title" style="text-align: center;">'+thiss.data.title+'</h2><p id="date" style="text-align: right;">'+thiss.data.date+'</p><hr id="line">'+value.html,          
          thiss.data.texthtmlData = value.html, 
          console.log('[getEditorContent callback texthtml]=>',thiss.data.texthtmlData);
          console.log('[getEditorContent callback]=>',value);
          console.log('[getEditorContent callback]=>',thiss.data.htmlData);
          thiss.uploadpaper();
          // const cloudpath = 'papers/'+thiss.data.department_name+'/'+thiss.data.disease_name+'/'+ thiss.data.title+'.html';
          // // var buf = new Buffer(thiss.data.htmlData,"utf-8")
          // thiss.uploadPaper(cloudpath);
        }
        else if (res.cancel) {
          console.log('用户点击取消')
         }
      }
    })
  }
  },

  //调用云函数上传文章html到数据库
  uploadpaper(){
    //加载提示
      console.log('dise=>'+this.data.disease_name);
      console.log('depart=>'+this.data.department_name),
      console.log('texthtml=>'+this.data.texthtmlData),     
      console.log(this.data.title)     
      console.log(this.data.date)                 
      //调用云函数上传文章html
      if(this.data.isUpdate){
        //先删了原来那篇文章再上传
        wx.cloud.callFunction({
          config:{ env: 'medremangement-cloud-8bn8d3d8486' },
          name:'delete_paper',
          data: {
            _id: this.data.update_article_obj._id
          },
          success: res =>{
            console.log("云函数删除成功")
          }
        })
      }
       wx.cloud.callFunction({
         config:{ env: 'medremangement-cloud-8bn8d3d8486' },
         name: 'set_paper',
         //参数
         data: {
           html: this.data.htmlData,
           texthtml:this.data.texthtmlData,
           disease:this.data.disease_name,
           department:this.data.department_name,
           titlename:this.data.title,
           date:this.data.date,
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
  
  // uploadPaper(cloudpath){
  //   wx.cloud.callFunction({
  //     config:{ env: 'medremangement-cloud-8bn8d3d8486' },
  //     name: 'upload_paper',
  //     //参数
  //     data: {
  //       cloudpath:cloudpath,
  //       buf:this.data.htmlData,
  //      },
  //      success: res => {
  //        // 关闭加载提示
  //        console.log('上传成功'+res.fileid);
  //      },
  //      fail: err => {
  //        // 关闭加载提示
  //        console.log('出错了 err ==> ', err);
  //      }
  //    })
  // },

  //得到当前日期
  getThisDate(){
    let date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      h = date.getHours(),
      m = date.getMinutes();
    //数值补0方法
    const zero = (value) => {
      if (value < 10) return '0' + value;
      return value;
    }
    return year + '/' + zero(month) + '/' + zero(day) + ' ' + zero(h) + ':' + zero(m);  
  },
      
})
