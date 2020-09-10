//app.js
App({
  globalData: {
    openid:'',
    nickname:'',
    account:'',
    password:'',
    name:'',
    class_name:'',
    res: null,
    examres: null,
    scoreres: null,
    url:'',
    yumin:'https://www.nishishei.xyz'
  },

  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true
      })
    }
    this.autoUpdate()
  },
  autoUpdate: function() {
    var self = this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //检测到新版本，需要更新，给出提示
          wx.showModal({
            title: '提示',
            content: '发现新版本，请更新并重启小程序',
            showCancel:false,//隐藏取消按钮
            confirmText:"确定",//只保留确定更新按钮
            success: function(res) {
              if (res.confirm) {
                //下载新版本，并重新应用
                self.downLoadAndUpdate(updateManager)
              }
            }
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  /**
   * 下载小程序新版本并重启应用
   */
  downLoadAndUpdate: function (updateManager){
    var self=this
    wx.showLoading();
    //静默下载更新小程序新版本
    updateManager.onUpdateReady(function () {
      wx.hideLoading()
      //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '提示',
        content: '新版本已经上线，请删除当前小程序并搜索打开',
      })
    })
  }

})