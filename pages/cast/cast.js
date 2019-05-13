import request from "../../common/request";
// pages/cast/cast.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieActors: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
    this.setData({
      movieId: parseInt(options.id)
    });

    this.getActors()
      .then(res => {
        console.log(res);
        this.setData({
          movieActors: { ...res }
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取演职员表
   */
  getActors: function() {
    return new Promise((resolve, reject) => {
      request
        .get(`/Movie/MovieCreditsWithTypes.api`, { movieId: this.data.movieId })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
})