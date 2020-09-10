// miniprogram/pages/saveeducation/saveeduaction.js
import {
  getClass as _getClass,
  login as _login
} from "../../network/request"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',
    password:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    if (app.globalData.account!=''){
      wx.showModal({
        title: '提示',
        content: '已有绑定信息',
        showCancel : false,
        success(res) {
          if (res.confirm) {
            wx.navigateBack({
              url:'../logs/logs'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  account: function(e){
    var result = e.detail.value;
    var _this = this;
    _this.setData({
      account: result
    })
  },

  password: function (e) {
    var result = e.detail.value;
    var _this = this;
    _this.setData({
      password: result
    })
  },

  binding: function (e) { 
    var _this = this
    
    if(_this.data.account == '' || _this.data.password == ''){
      wx.showModal({
        title: '提示',
        content: '请输入正确信息',
        showCancel: false,
      })
      return
    }

    if (app.globalData.openid == '') {
      wx.showModal({
        title: '提示',
        content: '请先微信授权',
        showCancel: false,
      })
      return
    }
    var p = _this.data.password
    // p = p.replace('%', '%25')
    // p = p.replace('+', '%2B')
    // p = p.replace(' ', '+')
    // p = p.replace('/', '%2F')
    // p = p.replace('?', '%3F')    
    // p = p.replace('#', '%23')
    // p = p.replace('&', '%26')
    // p = p.replace('=', '%3D')
    this.setData({
      password: p
    })
    wx.showLoading({
      title: '加载中',
    })
    console.log(_this.data.password)
    app.globalData.account = _this.data.account
    app.globalData.password = _this.data.password
    _login().then(res => {
      console.log(res)
      if (res.data === null || res.data.code === 40001 || res.data.msg == '失败'){
        wx.hideLoading()
        wx.showToast({
          title: '绑定失败',
          image: '/images/toerror.png'
        })
        return
      } else {          
        _this.savedata()
      }    
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '绑定失败',
        image: '/images/toerror.png'
      })
    })
  },
  // login: function (that) { //登录
  //   var _this = this
  //   _login().then(res => {
  //     console.log(res)
  //   })
  // },
  savedata: function(){
    console.log('save')
    const db = wx.cloud.database()
    const _ = db.command
    var _this = this
    db.collection('EducationSystem').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        if (res.data == ''){
          this.addData()
        }else{
          this.upData()
        }
      },
      fail: err => {
        //this.addData()
      }
    })
    
  },
  upData:function(){
    const db = wx.cloud.database()
    const _ = db.command
    var _this = this
    db.collection('EducationSystem').doc(app.globalData.openid).update({
      data: {
        account: _this.data.account,
        password: _this.data.password
      },
      success: function (res) {
        wx.hideLoading()
        setTimeout(function () {
          wx.showToast({
            title: '绑定成功',
          })
        }, 500)
        wx.navigateBack({
          url: '../logs/logs',
        })
      },
      fail: err => {
        setTimeout(function () {
          wx.showToast({
            title: '绑定失败',
            image: '/images/toerror.png'
          })
        }, 1000)
      }
    })
  },
  addData:function(){
    const db = wx.cloud.database()
    const _ = db.command
    var _this = this
    db.collection('EducationSystem').add({
      data: {
        _id: app.globalData.openid,
        account: _this.data.account,
        password: _this.data.password
      },
      success: res => {
        wx.hideLoading()
        setTimeout(function () {
          wx.showToast({
            title: '绑定成功',
          })
        }, 500)
        wx.navigateBack({
          url: '../logs/logs',
        })
      },
      fail: err => {
        setTimeout(function () {
          wx.showToast({
            title: '绑定失败',
            image: '/images/toerror.png'
          })
        }, 1000)
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }
})