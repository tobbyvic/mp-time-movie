//index.js
import request from "../../common/request";
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),

    movieList: [],
    loadModal: false
  },
  
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }

    // 获取影片列表
    this.getMovieList()
      .then(res => {
        this.setData({
          movieList: [...res.ms]
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getMovieList()
      .then(res => {
        this.setData({
          movieList: [...res.ms]
        });
        wx.stopPullDownRefresh();
      })
      .catch(err => {
        console.log(err);
      });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},
  // 获取正在热映影片列表
  getMovieList: function() {
    const locationId = wx.getStorageSync("locationId");
    this.setData({
      loadModal: true
    });
    return new Promise((resolve, reject) => {
      request
        .get(`/Showtime/LocationMovies.api`, { locationId })
        .then(res => {
          resolve(res.data);
          this.setData({
            loadModal: false
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  goToDetail: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.item.id//实际路径要写全
    })
  }
});
