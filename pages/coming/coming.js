//index.js
import request from "../../common/request";

// pages/coming/coming.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieList: [],
    loadModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取影片列表
    this.getMovieList()
      .then(res => {
        console.log(res);
        this.setData({
          movieList: [...res.moviecomings]
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 获取影片列表
    this.getMovieList()
      .then(res => {
        console.log(res);
        this.setData({
          movieList: [...res.moviecomings]
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
        .get(`/Movie/MovieComingNew.api`, { locationId })
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
      url: "/pages/detail/detail?id=" + e.currentTarget.dataset.item.id //实际路径要写全
    });
  }
});
