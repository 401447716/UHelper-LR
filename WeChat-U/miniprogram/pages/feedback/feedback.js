// miniprogram/pages/feedback/feedback.js
import {
  formatDate
} from '../../utils/utils.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  gettip: function(e){
    var result = e.detail.value;
    var _this = this;
    _this.setData({
      tip: result
    })
  },

  submit:function(){
    if(this.data.tip.length>0){
      this.onAdd()
    }else{
      wx.showToast({
        title: '未输入反馈内容',
        image: '/images/toerror.png'
      })
    }
  },

  onAdd: function () {
    let that = this
    const db = wx.cloud.database()
    db.collection('feedback').add({
      data: {
        tip:that.data.tip + '----' + new Date().toLocaleDateString()
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        setTimeout(function () {
          wx.showToast({
            title: '感谢反馈',
          })
        }, 1000)
        wx.navigateBack({
          url: '../log/log',
        })
      },
      fail: err => {
        setTimeout(function () {
          wx.showToast({
            title: '反馈失败',
            image: '/images/toerror.png'
          })
        }, 1000)
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })

  },
})