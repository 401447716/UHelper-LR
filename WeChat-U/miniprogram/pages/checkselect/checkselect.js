// miniprogram/pages/checkselect.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.showLoading({
      title: '查询中',
    })
    that.check(that)
  },

  check: function(that) { //登录
    wx.request({
      url: app.globalData.yumin +'/xk/Selected/' + app.globalData.account,
      method: 'GET',
      success(res) {
        if (res.data.code == 200) {
          if (res.data.data == '' || res.data.data == null) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              confirmText: '确定',
              showCancel:false,
              content: '暂无选课记录',
              success: function(res) {
                if (res.confirm) {
                  wx.navigateBack({
                    url: '../selectcourse/selectcourse',
                  })
                }
              }
            })
          } else {
            that.setData({
              courses_check: res.data.data
            })
            console.log(res.data.data)
            let k = 0;
            for (let i = 0; i < that.data.courses_check.length; i++) {
              that.data.courses_check[i].url = '/images/' + (k + 1) + '.png';
              k++;
              if (k % 9 == 0) {
                k = 0;
              }
            }
            that.setData({
              courses_check: that.data.courses_check
            })
            wx.hideLoading()
          }
        } else {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            confirmText: '确定',
            showCancel: false,
            content: '查询失败',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  url: '../selectcourse/selectcourse',
                })
              }
            }
          })
        }
      },
      fail(res) {
        wx.showModal({
          title: '提示',
          confirmText: '确定',
          showCancel: false,
          content: '获取不到数据',
        })
      }
    })
  },
})