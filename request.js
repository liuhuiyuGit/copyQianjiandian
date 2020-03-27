const baseUrl = 'http://t.api.shareber.com'; // 域名
//  const baseUrl = 'https://client.shareber.com'; // 域名
// const baseUrl = 'http://qijiandian.com'; // 域名

const md5 = require('./utils/md5')
const data = require('./utils/timeUtil')
const utils = require('./utils/util')
var timestamp = utils.formatTime(new Date())
timestamp = data.getUnixTime(timestamp)
function objKeySort(obj) {
     var newkey = Object.keys(obj).sort();
     var newObj = {};
     for (var i = 0; i < newkey.length; i++) {
         if(!obj[newkey[i]]==''){
             newObj[newkey[i]] = obj[newkey[i]];  
         }
     }
     return newObj;
}
const request = (url, params = {}) => {
    if (!params.header) {
        params.header = {}
    }
    var value = ''
    var n1 = objKeySort(params.query)
    for (var item in n1) {
        value += item + '=' + n1[item] + '&';
    }
    value += 'key=shareberqijiandian'+'&timestamp='+timestamp
    value = md5.hex_md5(value)
    return new Promise((resolved, reject) => {
        params.header.token = value
        params.header.timestamp = timestamp        
        wx.request({
            url: baseUrl + url,
            method: params.method || 'post',
            data: params.query || {},
            header: params.header,
            success: res => resolved(res),
            fail: res => reject(res)
        })
    })
}
module.exports = {
    request,
    baseUrl
}