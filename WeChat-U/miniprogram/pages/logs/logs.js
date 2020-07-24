// miniprogram/pages/logs/logs.js
const app = getApp()

Page({
  data: {
    avatarUrl: '/images/tx.png',
    logged: false,
    userInfo: {},
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: 'logs',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.nickname = res.userInfo.nickName;
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                logged: true,
              })
            }
          })
        }
      }
    })
  },
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  deleteall: function() {
    const db = wx.cloud.database()
    const _ = db.command
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success(res) {
        if (res.confirm) {
          //that.removeall()
          if (app.globalData.account != ''){
            db.collection('EducationSystem').doc(app.globalData.openid).update({
              data: {
                account: '',
                password: ''
              },
              success: function (res) {
                app.globalData.account = ''
                app.globalData.password = ''
                wx.clearStorage()
              }
            })
          }
          
          
        } else if (res.cancel) {

        }
      }
    })
  },

  onRemove: function (_id) {
    if (this.data.openid) {
      const db = wx.cloud.database()
      db.collection('datedata').doc(_id).remove({
        success: res => {

        },
        fail: err => {

          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
    } else {
      wx.showToast({
        title: '无记录可删，请见创建一个记录',
      })
    }
  },

  aboutsystem:function(){
    wx.showModal({
      title: '',
      content: 'U助手是一款提供给开发人员所在的学校学生进行成绩查询，课表查询，委托服务，选课等功能的小程序。\r\nU助手目前功能还在完善中，如果有什么建议或者问题，请在反馈中提出您的宝贵意见。\r\nU助手期待您的合作，合作微信：klaykeith。',
      showCancel:false
    })
  }
})