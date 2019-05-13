import request from "../../common/request";
// pages/poster/poster.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posters: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
    this.setData({
      movieId: parseInt(options.id)
    });

    this.getPosters()
      .then(res => {
        console.log(res);

        let arr = [...res.imageTypes].map((item) => {
          return {
            ...item,
            imagesArray: []
          }
        });
        
        for (const i of res.images) {
          const obj = arr.find((item) => i.type === item.type);
          obj.imagesArray.push({...i});
        }
        // console.log(arr);
      
        this.setData({
          posters: [...arr]
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
   * 获取电影剧照
   */
  getPosters: function() {
    return new Promise((resolve, reject) => {
      request
        .get(`/Movie/ImageAll.api`, { movieId: this.data.movieId })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
})