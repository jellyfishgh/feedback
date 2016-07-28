# 移动端客服-user end api document

## (后台)获取问题详情函数ID：46916

最后修改时间：2016-06-2218:57:22

是否需要登录：是

HTTP请求方式：GET

请求参数：

参数名必选类型及范围说明

id是int问题id

返回结果：

``` js
{
  "code":0,
  "message":"",
  "extData":{
    "problem":{
      "id":39,
      "uid":20005975,
      "email":"253033679@qq.com",
      "content":"2121212",
      "picurl":"",
      "logurl":"",
      "answer_num":0,
      "devName":"",
      "sysVersion":"",
      "appVersion":"",
      "platform":1,
      "createTime":"2016-06-22T07:45:42.000Z",
      "pics":[],
      "logs":[],
      "next":0,
      "previous":40
    },
    "answerList":[
      {
        "id":1,
        "feedbackid":39,
        "uid":"dengyun@henhaoji.com",
        "content":"111",
        "picurl":"",
        "type":1,
        "createTime":"2016-06-22T07:49:12.000Z",
        "pics":[]
      }
    ]
  }
}
```

返回字段说明：

字段名类型说明

``` js
code number
message string
extData object
   problem object
      id number回复id
      uid number战盟id
      email string邮箱地址
      content string内容
      picurl string图片地址
      logurl string日志地址
      answer_num number回复数
      devName string设备
      sysVersion string系统信息
      appVersion stringAPP版本
      platform number平台　1ios2android
      createTime string时间
      pics array图片URL数组
      logs array日志URL数组
      next number下一条问题id
      previous number上一条问题id
   answerList array回复列表
      feedbackid number问题id
      type number1客服回复2玩家回复
```

[内网接口地址](http://192.168.191.94:8029/mobile/feedback/api/getMobileProblemDetail)

## (后台)客服回复函数ID：46917

最后修改时间：2016-06-2219:00:31

是否需要登录：是

HTTP请求方式：POST

请求参数：

参数名必选类型及范围说明

feedbackid是问题id

content是回复内容

返回结果：

``` js
{
  "code":0,
  "message":"回复成功"
}
```

返回字段说明：

字段名类型说明

``` js
code number
message string
```

[内网接口地址](http://192.168.191.94:8029/mobile/feedback/api/postMobileAnswer)