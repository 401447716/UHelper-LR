import { formatTime1 } from '../../utils/utils.js';
import { login as _login, getCourseMessage as _getCourseMessage, getNoSelectedCourseMessage as _getNoSelectedCourseMessage, getAllSelectedCourseMessage as _getAllSelectedCourseMessage, addDeSelectedJ as _addDeSelectedJ, addSelectedJ as _addSelectedJ, addRepairSelectedJ as _addRepairSelectedJ, deleteSelected as _deleteSelected, findquerySelected as _findquerySelected } from "../../network/request";
const app = getApp()
Page({
  data: {
    first: true,
    inSelectTime: false,
    inQuitTime: false,
    inBxTime: false,

  },

  onLoad: function (res) {
    var that = this
    that.login(that);
  },

  checkboxChange: function (e) { //checkbox点击事件
    //判断是否在选课阶段
    let i;
    if (this.data.inSelectTime) {
      let i;
      for (i = 0; i < 99; i++) { //选课阶段_未选课程内容_即全部选课信息
        if (this.data.courses[i] != null) {
          if (this.data.courses[i].isselect == null)
            this.data.courses[i].isselect = ''
          if (e.target.id == this.data.courses[i].name)
            if (this.data.courses[i].isselect == 'true') {
              this.data.courses[i].isselect = ''
            }
          else {
            this.data.courses[i].isselect = 'true'
          }
        } else {
          break;
        }
      }
      this.setData({
        courses_check: this.data.courses
      })

      for (i = 0; i < this.data.haveSelect.length; i++) {
        if (e.currentTarget.dataset.id == this.data.haveSelect[i].cid) {
          if (this.data.haveSelect[i].selected == true) {
            this.data.haveSelect[i].selected = false;
          } else {
            this.data.haveSelect[i].selected = true;
          }
        }
      }

    } else if (this.data.inQuitTime) {
      let i;
      for (i = 0; i < 99; i++) { //退课阶段_已选课程内容
        if (this.data.courses_check_quit[i] != null) {
          if (this.data.courses_check_quit[i].courses.isselect == null)
            this.data.courses_check_quit[i].courses.isselect = ''
          if (e.target.id == this.data.courses_check_quit[i].courses.name) {
            if (this.data.courses_check_quit[i].courses.isselect == 'true') {
              this.data.courses_check_quit[i].courses.isselect = ''
            } else {
              this.data.courses_check_quit[i].courses.isselect = 'true'
            }
          }
        } else {
          break;
        }
      }
      console.log(this.data.courses_check_quit)
    }


  },

  checkboxChangeByRepair: function (e) { //补选阶段checkbox点击事件
    //判断是否在补选阶段
    if (this.data.inBxTime) {
      let i;
      for (i = 0; i < 99; i++) {
        if (this.data.courses_repair[i] != null) {
          if (this.data.courses_repair[i].isselect == null)
            this.data.courses_repair[i].isselect = ''
          if (e.target.id == this.data.courses_repair[i].name) {
            if (this.data.courses_repair[i].isselect == 'true') {
              this.data.courses_repair[i].isselect = ''
            } else {
              this.data.courses_repair[i].isselect = 'true'
            }
          }
        } else {
          break;
        }
      }
      this.setData({
        courses_repair: this.data.courses_repair
      })
      console.log(this.data.courses_repair)
    }
  },

  commitmessage: function () { //提交初始选课内容
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确定选课内容?',
      success(res) {
        if (res.confirm) {
          that.checkIsSelected()
          that.setData({
            first: false
          })
        } else if (res.cancel) {}
      }
    })
  },

  changemessage: function () { //修改选课内容
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否修改选课内容?',
      success(res) {
        if (res.confirm) {
          that.addAndDelete(that)
        } else if (res.cancel) {}
      }
    })
  },

  commitRepairMessage: function () { //提交初始补选信息
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确定补选课程?',
      success(res) {
        if (res.confirm) {
          that.checkIsRepairSelected()
        } else if (res.cancel) {}
      }
    })
  },

  login: function (that) { //登录
    _login().then(res => {
      if (res.data.code == 200) {
        that.setData({
          sId: res.data.data.id,
          aId: res.data.data.aid,
          nowTime: formatTime1(new Date())
        })
        that.getCourseMessage(that) //选课数据
        that.getNoSelectedCourseMessage(that) //补选数据
        that.getAllSelectedCourseMessage(that) //退课数据
      } else {
        wx.showModal({
          title: '提示',
          confirmText: '确定',
          cancelText: '取消',
          content: '获取不到学生信息',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                url: '../selectcourse/selectcourse',
              })
            }
          }
        })
      }
    })
  },

  getCourseMessage: function (that) { //获得选课信息
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    _getCourseMessage(that.data.aId).then(res => {
      wx.hideLoading()
      if (res.data.code == '40001') {
        wx.showModal({
          title: '提示',
          confirmText: '确定',
          showCancel: false,
          content: '系统繁忙，请稍后重试',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                url: '../index/index',
              })
            }
          }
        })
      } else {
        if (res.data == '') {
          that.setData({
            inSelectTime: false,
            inQuitTime: false,
            inBxTime: false,
            noTime: true,
          })
        } else {
          that.setData({
            courses: res.data,
          })
          that.findquerySelected(that)
        }
      }
    }).catch(err => {
      wx.hideLoading()
    })
  },

  getNoSelectedCourseMessage: function (that) { //获得未选课程信息
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    _getNoSelectedCourseMessage().then(res => {
      if (res.data.data.length == 0) {
        that.setData({
          noBxCourseCanSelect: true,
        })
      } else {
        that.setData({
          noBxCourseCanSelect: false
        })
        that.checkBx(that, res.data.data)
      }
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  },

  getAllSelectedCourseMessage: function (that) { //获取选课和补选的信息
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    _getAllSelectedCourseMessage().then(res => {
      if (res.data.code == 200) {
        that.setData({
          allSelected: res.data.data
        })
        that.checkQuit(that)
        wx.hideLoading()
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '获取数据失败',
          icon: 'none',
          mask: true,
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        confirmText: '确定',
        showCancel: false,
        content: '获取不到数据',
      })
    })
  },

  checkBx: function (that, courses) { //处理补选数据
    let repairarr = new Array();
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].bxTime <= that.data.nowTime && that.data.nowTime <= courses[i].bxEndTime) {
        repairarr.push(courses[i]);
      }
    }
    that.setData({
      repairarr: repairarr
    })
    if (this.data.repairarr.length != 0) { //补选数组判断
      var bxTime = repairarr[0].bxTime //补课开始时间
      var bxEndTime = repairarr[0].bxEndTime //补课结束时间
      for (let i = 0; i < repairarr.length; i++) {
        if (bxTime > repairarr[i].bxTime) {
          bxTime = repairarr[i].bxTime
        }
        if (bxEndTime < repairarr[i].bxEndTime) {
          bxEndTime = repairarr[i].bxEndTime
        }
      }
      that.setData({
        bxTime: bxTime, //补选时间
        bxEndTime: bxEndTime, //补选截止时间
        noBxCourseCanSelect: false
      })
    } else {
      that.setData({
        bxTime: '', //补选时间
        bxEndTime: '', //补选截止时间
        noBxCourseCanSelect: true
      })
    }
    if (that.data.bxTime <= that.data.nowTime && that.data.nowTime <= that.data.bxEndTime) { //进入补选功能
      console.log("进入补选功能")
      let k = 0;
      for (let i = 0; i < that.data.repairarr.length; i++) {
        that.data.repairarr[i].url = '/images/' + (k + 1) + '.png';
        k++;
        if (k % 9 == 0) {
          k = 0;
        }
      }
      that.setData({
        noTime: false,
        courses_repair: that.data.repairarr
      })
    }
  },

  checkIsSelected: function () { //判断是否勾选,将所以勾选的选项统一进行插入
    var that = this;
    let i;
    var selecteds = new Array();
    for (i = 0; i < that.data.courses.length; i++) {
      if (that.data.courses[i].isselect != null) {
        if (that.data.courses[i].isselect == 'true') {
          selecteds.push({
            cid: that.data.courses[i].id,
            sid: that.data.sId,
          })
        }
      }
    }
    if (selecteds.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请勾选内容',
        showCancel: false,
        confirmText: '确定',
      })
    } else {
      that.addSelectedJ(that, selecteds)
    }
  },

  checkIsDeSelected: function () { //判断是否勾选,勾选的就插入————退选
    var that = this;
    let i;
    let selecteds = [];
    console.log(that.data.courses_check_quit)
    for (i = 0; i < that.data.courses_check_quit.length; i++) {
      if (that.data.courses_check_quit[i].courses.isselect == 'true') {
        selecteds.push(that.data.courses_check_quit[i].id)
      }
    }
    that.addDeSelectedJ(that, selecteds)
  },

  checkIsRepairSelected: function () { //判断是否勾选,将所以勾选的选项统一进行插入
    var that = this;
    let i;
    var selecteds = new Array();
    var updateBxArray = new Array();
    for (i = 0; i < that.data.repairarr.length; i++) {
      if (that.data.repairarr[i].isselect != null) {
        if (that.data.repairarr[i].isselect == 'true') {
          selecteds.push({
            cid: that.data.repairarr[i].id,
            sid: that.data.sId,
          })
        } else {
          updateBxArray.push(that.data.repairarr[i])
        }
      }
    }
    that.addRepairSelectedJ(that, selecteds, updateBxArray)
  },

  addDeSelectedJ: function (that, ids) { //一次性添加退课信息
    if (ids.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请勾选内容',
        showCancel: false,
        confirmText: '确定'
      })
    } else {
      _addDeSelectedJ(ids).then(res => {
        ids = [] //清空已选数组
        if (res.statusCode == 200) {
          var check1 = new Array(); //页面数据更新覆盖
          let i;
          for (i = 0; i < that.data.courses_check_quit.length; i++) {
            if (that.data.courses_check_quit[i].courses.isselect == 'true') {
              continue;
            } else {
              check1.push(that.data.courses_check_quit[i])
            }
          }
          let tip = new String()
          let j;
          for (let id in res.data.data) {
            for (j = 0; j < that.data.courses_check_quit.length; j++) {
              if (id == that.data.courses_check_quit[j].id) {
                tip = tip + that.data.courses_check_quit[j].courses.name + res.data.data[id] + '\r\n'
                if (res.data.data[id] == '选课达到最小人数，不能退课') {
                  check1.push(that.data.courses_check_quit[j])
                }
              }
            }
          }
          console.log(tip)
          wx.showModal({
            title: '提示',
            content: tip,
            confirmText: '确定',
            showCancel: false
          })
          if (check1.length == 0) {
            that.setData({
              noQuitCourseCanSelect: true
            })
          }
          that.setData({
            courses_check_quit: check1
          })
        } else {
          wx.showToast({
            title: '退课失败',
            icon: 'none',
            mask: true,
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },

  addSelectedJ: function (that, courses) { //一次性提交选课信息
    _addSelectedJ(courses).then(res => {
      if (res.statusCode == 200) {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          mask: true,
        })
      } else {
        wx.showToast({
          title: '修改失败',
          icon: 'none',
          mask: true,
        })
      }
      that.findquerySelected(that)
    })
  },

  addRepairSelectedJ: function (that, courses, updateBxArray) { //一次性提交补选信息
    if (courses.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请勾选内容',
        showCancel: false,
        confirmText: '确定'
      })
    } else {
      console.log(courses)
      console.log(updateBxArray)
      if (updateBxArray.length == 0) {
        that.setData({
          noBxCourseCanSelect: true
        })
      }
      wx.showLoading({
        title: '提交中'
      })
      _addRepairSelectedJ(courses).then(res => {
        if (res.statusCode == 200) {
          wx.hideLoading()
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            mask: true,
          })
          console.log(res)
          that.setData({
            courses_repair: updateBxArray,
            repairarr: updateBxArray
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            mask: true,
          })
        }
      }).catch(err => {
        wx.hideLoading()
      })
    }
  },

  deleteSelected: function (that, id) { //删除选课信息
    _deleteSelected(id).then(res => {
      that.findquerySelected(that)
    })
  },

  mateHaveSelectAndCourses: function (that) { //同步修改选课信息的勾选情况——选课
    let i;
    var haveSelects = new Array();
    for (i = 0; i < that.data.courses.length; i++) {
      if (that.data.courses[i].isselect == 'true') {
        haveSelects.push(that.data.courses[i])
      }
    }
    that.setData({
      haveSelects: haveSelects
    })
  },

  addAndDelete: function (that) { //选课课程修改——有选的就更新，没选过的就插入
    that.mateHaveSelectAndCourses(that)
    let i, j;
    let have;
    var selecteds = new Array();
    for (i = 0; i < that.data.haveSelects.length; i++) { //比较选择前和选择后，对没有勾选的进行添加数据
      have = false;
      for (j = 0; j < that.data.haveSelect.length; j++) {
        if (that.data.haveSelects[i].id == that.data.haveSelect[j].cid) {
          have = true
          break;
        }
      }
      if (have == false) {
        selecteds.push({
          cid: that.data.haveSelects[i].id,
          sid: that.data.sId
        })
      }
    }

    that.addSelectedJ(that, selecteds)

    for (i = 0; i < that.data.haveSelect.length; i++) { //比较选择前和选择后，对取消勾选的进行删除数据
      have = false;
      for (j = 0; j < that.data.haveSelects.length; j++) {
        if (that.data.haveSelect[i].cid == that.data.haveSelects[j].id) {
          have = true
          break;
        }
      }
      if (have == false) {
        that.deleteSelected(that, that.data.haveSelect[i].id)
      }
    }
  },


  deletemessage: function () { //退选按钮点击事件
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定退选?',
      success(res) {
        if (res.confirm) {
          that.checkIsDeSelected()
        } else if (res.cancel) {}
      }
    })
  },

  findquerySelected: function (that) { //通过sId查找选课信息
    _findquerySelected(that.data.sId).then(res => {
      that.setData({
        haveSelect: res.data
      })
      that.checkHaveSelectAndCourses(that, that.data.haveSelect)
    })
  },

  checkQuit: function (that) { //处理退课数据
    let quitarr = new Array();
    for (let i = 0; i < that.data.allSelected.length; i++) {
      if (that.data.allSelected[i].courses.quitTime < that.data.nowTime && that.data.nowTime < that.data.allSelected[i].courses.quitEndTime) {
        quitarr.push(that.data.allSelected[i]);
      }
    }
    if (quitarr.length != 0) { //退课数组判断
      let quitTime = quitarr[0].courses.quitTime //退课开始时间初始化
      let quitEndTime = quitarr[0].courses.quitEndTime //退课结束时间初始化
      for (let i = 0; i < quitarr.length; i++) {
        if (quitTime > quitarr[i].courses.quitTime) {
          quitTime = quitarr[i].courses.quitTime
        }
        if (quitEndTime < quitarr[i].courses.quitEndTime) {
          quitEndTime = quitarr[i].courses.quitEndTime
        }
      }
      that.setData({
        quitTime: quitTime, //退课时间
        quitEndTime: quitEndTime, //退课截止时间
        noQuitCourseCanSelect: false
      })
    } else {
      that.setData({
        quitTime: '', //退课时间
        quitEndTime: '', //退课截止时间
        noQuitCourseCanSelect: true //没有课程可选
      })
    }
    that.setData({
      quitarr: quitarr
    })
    if (that.data.quitTime <= that.data.nowTime && that.data.nowTime <= that.data.quitEndTime) { //进入退选功能
      console.log("进入退选功能")
      let k = 0;
      for (let i = 0; i < that.data.quitarr.length; i++) {
        that.data.quitarr[i].url = '/images/' + (k + 1) + '.png';
        k++;
        if (k % 9 == 0) {
          k = 0;
        }
      }
      that.setData({
        courses_check_quit: that.data.quitarr
      })
    }
  },

  checkHaveSelectAndCourses: function (that, haveSelect) { //匹配是否勾选
    that.setData({
      selectColor: "#008B8B",
      quitColor: "#aaa",
      bxColor: "#aaa",
      inSelectTime: true,
      inQuitTime: false,
      inBxTime: false,
    })
    let i, j;
    for (i = 0; i < that.data.courses.length; i++) {
      that.data.courses[i].isselect = ''
    }

    //通过查询已选的课程跟可选的课程比较，筛选出已勾选的项目
    for (i = 0; i < haveSelect.length; i++) {
      for (j = 0; j < that.data.courses.length; j++) {
        if (haveSelect[i].cid == that.data.courses[j].id) {
          that.data.courses[j].isselect = 'true'
        }
      }
    }

    let arr = new Array(); //时间同步

    for (let i = 0; i < that.data.courses.length; i++) {
      if (that.data.courses[i].selectTime < that.data.nowTime && that.data.nowTime < that.data.courses[i].selectEndTime) {
        arr.push(that.data.courses[i]);
      }
    }
    that.setData({
      arr: arr
    })

    if (this.data.arr.length != 0) { //选课数组判断
      var selectTime = arr[0].selectTime //选课开始时间
      var selectEndTime = arr[0].selectEndTime //选课结束时间
      for (let i = 0; i < arr.length; i++) {
        if (selectTime > arr[i].selectTime) {
          selectTime = arr[i].selectTime
        }
        if (selectEndTime < arr[i].selectEndTime) {
          selectEndTime = arr[i].selectEndTime
        }
      }
      that.setData({
        selectTime: selectTime, //选课起始时间
        selectEndTime: selectEndTime, //选课截至时间
        noSelectCourseCanSelect: false
      })
    } else {
      that.setData({
        selectTime: '', //选课起始时间
        selectEndTime: '', //选课截至时间
        noSelectCourseCanSelect: true
      })
    }

    //判断是否在选课时间内
    if (that.data.selectTime <= that.data.nowTime && that.data.nowTime <= that.data.selectEndTime) {
      that.setData({
        courses: that.data.arr
      })
      let k = 0;
      for (let i = 0; i < that.data.courses.length; i++) {
        that.data.courses[i].url = '/images/' + (k + 1) + '.png';
        k++;
        if (k % 9 == 0) {
          k = 0;
        }
      }
      that.setData({
        // selectColor: "#008B8B",
        // quitColor: "#aaa",
        // bxColor: "#aaa",
        // inSelectTime: true,
        // inQuitTime: false,
        // inBxTime: false,
        courses_check: that.data.courses
      })
      that.checkFirstSelect(that) //检查是否是第一次选课
    }
  },

  checkFirstSelect: function (that) { //判断是否第一次选课 
    let i;
    for (i = 0; i < that.data.courses.length; i++) {
      if (that.data.courses[i].isselect != null) {
        that.setData({
          first: false
        })
        break
      }
    }
  },

  selectCourse: function () {
    var that = this;
    let k = 0;
    // that.findquerySelected(that) //同步更新勾选情况
    if(that.data.arr != undefined){
      that.findquerySelected(that)
      for (let i = 0; i < that.data.arr.length; i++) {
        that.data.arr[i].url = '/images/' + (k + 1) + '.png';
        k++;
        if (k % 9 == 0) {
          k = 0;
        }
      }
      that.setData({
        selectColor: "#008B8B",
        quitColor: "#aaa",
        bxColor: "aaa",
        inSelectTime: true,
        inQuitTime: false,
        inBxTime: false,
        courses_check: that.data.arr
      })
    }else{
      that.setData({
        selectColor: "#008B8B",
        quitColor: "#aaa",
        bxColor: "aaa",
        inSelectTime: true,
        inQuitTime: false,
        inBxTime: false,
        noSelectCourseCanSelect: true
      })
    }


  },

  quitCourse: function () {
    if (this.data.noQuitCourseCanSelect == true) {
      this.getAllSelectedCourseMessage(this)
      this.setData({
        selectColor: "#aaa",
        quitColor: "#008B8B",
        bxColor: "aaa",
        inSelectTime: false,
        inQuitTime: true,
        inBxTime: false,
      })
    } else {
      this.setData({
        selectColor: "#aaa",
        quitColor: "#008B8B",
        bxColor: "aaa",
        inSelectTime: false,
        inQuitTime: true,
        inBxTime: false,
        noQuitCourseCanSelect: false
      })
      //初始化复选框勾选情况
      if (this.data.courses_check_quit != null) {
        let j;
        for (j = 0; j < this.data.courses_check_quit.length; j++) {
          this.data.courses_check_quit[j].courses.isselect = ''
        }
        this.getAllSelectedCourseMessage(this)
      }
    }
  },

  repairCourse: function () {
    if (this.data.noBxCourseCanSelect == true) {
      this.getNoSelectedCourseMessage(this)
      this.setData({
        selectColor: "#aaa",
        quitColor: "#aaa",
        bxColor: "#008B8B",
        inSelectTime: false,
        inQuitTime: false,
        inBxTime: true,
      })
    } else {
      this.setData({
        selectColor: "#aaa",
        quitColor: "#aaa",
        bxColor: "#008B8B",
        inSelectTime: false,
        inQuitTime: false,
        inBxTime: true,
        noBxCourseCanSelect: false
      })
      //初始化复选框勾选情况
      if (this.data.courses_repair != null) {
        let j;
        for (j = 0; j < this.data.courses_repair.length; j++) {
          this.data.courses_repair[j].isselect = ''
        }
        this.getNoSelectedCourseMessage(this)
      }
    }
  }
})