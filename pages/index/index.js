const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

const UNPROMPTED_TIPS = "点击获取当前位置"
const UNAUTHORIZED_TIPS = "点击开启位置权限"
const AUTHORIZED_TIPS = ""

Page({
  data: {
    nowTemp: '',
    nowWeather: '',
    nowWeatherBackground: "",
    hourlyWeather: [],
    todayTemp: "",
    todayDate: "",
    city: '广州市',
    locationTipsText: UNPROMPTED_TIPS,
    locationAuthType: UNPROMPTED
  },
  onLoad() {
    this.qqmapsdk = new QQMapWX({
      key: 'EAXBZ-33R3X-AA64F-7FIPQ-BY27J-5UF5B'
    })
    this.getNow()
  },
  onShow() {
    wx.getSetting({
      success: res=>{
        let auth = res.authSetting['scope.userLocation']
        if (auth && this.data.locationAuthType != AUTHORIZED) {
          //权限从无到有
          this.setData({
            locationAuthType: AUTHORIZED,
            locationTipsText: AUTHORIZED_TIPS
          })
          this.getLocation()
        }
        //权限从有到无未处理
      }
    })
  },
  onPullDownRefresh(){
    this.getNow(() => {
      wx.stopPullDownRefresh()
    })
  },
  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: this.data.city
      },
      success: res => {
        let result = res.data.result
        this.setNow(result)
        this.setHourlyWeather(result)
        this.setToday(result)
      },
      complete: () =>{
        callback && callback()
      }
    })
  },
  setNow(result){
    let temp = result.now.temp
    let weather = result.now.weather
    this.setData({
      nowTemp: temp + '°',
      nowWeather: weatherMap[weather],
      nowWeatherBackground: '/images/' + weather + '-bg.png'
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weather],
    })
  },
  setHourlyWeather(result){
    let forecast = result.forecast
    let hourlyWeather = []
    let nowHour = new Date().getHours()
    for (let i = 0; i < 8; i += 1) {
      hourlyWeather.push({
        time: (i*3 + nowHour) % 24 + "时",
        iconPath: '/images/' + forecast[i].weather + '-icon.png',
        temp: forecast[i].temp + '°'
      })
    }
    hourlyWeather[0].time = '现在'
    this.setData({
      hourlyWeather: hourlyWeather
    })
  },
  setToday(result) {
    let date = new Date()
    this.setData({
      todayTemp: `${result.today.minTemp}° - ${result.today.maxTemp}°`,
      todayDate: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} 今天`
    })
  },
  onTapDayWeather(){
    wx.navigateTo({
      url: '/pages/list/list?city=' + this.data.city,
    })
  },
  onTapLocation(){
    if (this.data.locationAuthType === UNAUTHORIZED)
      wx.openSetting()
    else
      this.getLocation()
  },
  getLocation() {
    wx.getLocation({
      success: res=>{
        this.setData({
          locationAuthType: AUTHORIZED,
          locationTipsText: AUTHORIZED_TIPS
        })
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res=>{
            let city = res.result.address_component.city
            this.setData({
              city:city,
            })
            this.getNow()
          }
        })
      },
      fail: () => {
        this.setData({
          locationAuthType: UNAUTHORIZED,
          locationTipsText: UNAUTHORIZED_TIPS
        })
      }
    })
  }
})