// pages/exam/exam.js
import { getExam } from '../../network/request.js';
import { getCurrentMonthFirst } from '../../utils/utils.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //  获取当前日期
    let now = getCurrentMonthFirst();
    this.setData({
      now
    })

    //  获取缓存信息
    wx.getStorage({
      key: 'exam',
      success(res) {
        if (res === '' || res === null) {
          wx.showLoading({
            title: '获取考试信息中',
          })
          that.getExamData(1)
          return
        } else {
          that.formatArray(res.data);
        }
      },
      fail: function (res) {
        wx.showLoading({
          title: '获取考试信息中',
        })
        that.getExamData(1)
        return
      }
    })
  },
  getExamData: function (time) {
    let that = this
    if (time < 5) { //  通过time计算发送请求的次数，用于请求失败时再次发送请求
      //  获取考试数据
      getExam().then(res => {
        if (res.data != '') {
          //  缓存考试数据
          wx.setStorage({
            key: "exam",
            data: res.data
          })
          wx.hideLoading()
          that.onLoad()
        } else {
          this.getExamData(time + 1)
        }
      }).catch(res => {
        this.getExamData(time + 1)
      })
    } else {
      wx.hideLoading()
      wx.showModal({
        title: '获取考试信息失败',
        content: '../images/toerror.png',
      })
    }
  },
  //  格式化数据
  formatArray: function (results) {
    var res = {};
    if (results == '' || results == null) {
      wx.showModal({
        title: '提示',
        content: '暂无考试信息',
        confirmText: '确定',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              url: '../index/index',
            })
          }
        }
      })
    } else {
      for (let i = 1; i < results.length; i++) {
        if (results[i].id != '') {
          if (results[i].courseName == '&nbsp;') {
            results[i].courseName = '待定'
          }
          if (results[i].form == '&nbsp;') {
            results[i].form = '待定'
          }
          if (results[i].personName == '&nbsp;') {
            results[i].personName = '待定'
          }
          if (results[i].place == '&nbsp;') {
            results[i].place = '待定'
          }
          if (results[i].school == '&nbsp;') {
            results[i].school = '待定'
          }
          if (results[i].seat == '&nbsp;') {
            results[i].seat = '待定'
          }
          if (results[i].testTime == '&nbsp;') {
            results[i].testTime = '待定'
          }
          if (results[i].testTime == '待定') {
            results[i].countdown = '待定'
          } else {
            let time = results[i].testTime
            time = time.slice(7, 17)
            results[i].countdown = this.datedifference(time)
          }
          res[i - 1] = results[i];
        }
      }
      this.setData({
        examInfo: res,
      })
    }
  },

  /**
   * 计算倒计时
   * sDate1和sDate2是2006-12-18格式  
   */
  datedifference: function (sDate2) {
    let dateSpan
    let that = this
    let iDays
    let sDate1
    sDate1 = Date.parse(that.data.now);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    if (dateSpan < 0) {
      return "已结束"
    }
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays + "天"
  }
})