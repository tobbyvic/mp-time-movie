//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),

    ctx: null // canvas上下文对象
  },
  onLoad: function() {
    // open-type=getUserInfo可以使用的情况，判断是否已授权
    if (this.canIUse) {
      // 获取用户信息
      wx.getSetting({
        success: res => {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          if (res.authSetting["scope.userInfo"]) {
            this.getUserInfoWhenAuth();
          }
          // 没有授权则不用处理，会显示遮罩
        }
      });
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      this.getUserInfoWhenAuth();
    }
  },
  onShow: function() {
    if (app.globalData.currentImg) {
      this.drawAvatar(app.globalData.currentImg);
    }
  },
  // 初始化canvas
  initCanvas: function() {
    const ctx = wx.createCanvasContext("canvas");
    this.setData({
      ctx: ctx
    });
    this.drawAvatar();
  },
  // 绘制头像
  drawAvatar: function(url) {
    let avatarUrl = "";
    // 如果有url,则按照url来绘制
    if (url) {
      avatarUrl = url;
    } else {
      avatarUrl = this.data.userInfo.avatarUrl.replace("/132", "/0"); // 换成高清头像
    }
    console.log(avatarUrl)

    const ctx = this.data.ctx;
    // ctx.drawImage(avatarUrl, 0, 0, 300, 300);
    // ctx.drawImage("/images/head-2.png", 0, 0, 300, 300);
    // ctx.draw(true);
    wx.getImageInfo({
      src: avatarUrl,
      success(res) {
        console.log(res);
        ctx.drawImage(res.path, 0, 0, 300, 300);
        ctx.drawImage("/images/head-2.png", 0, 0, 300, 300);
        ctx.draw(true);
      }
    });
  },
  // 授权的情况下，获取头像信息
  getUserInfoWhenAuth: function() {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
          this.initCanvas();
          resolve(res);
        }
      });
    });
  },
  // 没有授权的情况下点击按钮进行授权获取头像信息
  getUserInfo: function(e) {
    console.log(e);
    // 如果同意授权
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      this.initCanvas();
    } else {
      // 不进行操作
    }
  },
  // 更改图片
  changeImg: function() {
    wx.navigateTo({
      url: "/pages/cut/cut"
    });
  }
});
