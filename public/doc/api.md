# 移动端客服

## 移动端提交问题反馈函数ID：46912

最后修改时间：2016-06-2218:49:16

是否需要登录：否

HTTP请求方式：POST

请求参数

参数名必选类型及范围说明

1. sign是string验证口令
1. uid是int战盟id
1. email是string邮箱
1. content是string反馈内容
1. picurl否string图片URL，多张图片逗号隔开
1. logurl否string日志URL，多个日志逗号隔开
1. devName是设备名
1. sysVersion是系统信息
1. appVersion是APP版本
1. platform是1ios2android

返回结果：

```js
{
  "code":0,
  "extData":{
    "id":41,
    "uid":"20005975",
    "email":"253033679@qq.com",
    "content":"222",
    "picurl":"",
    "logurl":"",
    "devName":"xiaomi",
    "sysVersion":"11",
    "appVersion":"1.1",
    "platform":1,
    "createTime":"2016-06-22T08:23:12.165Z"
  }
}
```

返回字段说明：

字段名类型说明

``` js
code number
extData object
   id number问题id
   uid string
   email string
   content string
   picurl string
   logurl string
   devName string
   sysVersion string
   appVersion string
   platformnumber
   createTime string
```

> [内测服](http://192.168.191.94:8077/) -> [正式服](http://ywweb.duoyi.com/)

> [内测服](http://192.168.191.94:8029/) -> [正式服](http://ywweb.duoyi.com:8029/)

> [内网接口地址](http://192.168.191.94:8077/mobile/feedback/api/problem)

> picurl需先从战盟服上传图片后获取URL

> logurl需先从战盟服上传后日志后获取URL

## 获取我的反馈列表函数ID：46913

最后修改时间：2016-06-2218:41:05

是否需要登录：否

HTTP请求方式：GET

请求参数：

参数名必选类型及范围说明

uid是int战盟id

返回结果：

```js
{
  "code":0,
  "extData":[
    {
      "id":41,
      "uid":20005975,
      "email":"253033679@qq.com",
      "content":"222",
      "picurl":"",
      "logurl":"",
      "answer_num":0,
      "serviceremind":1,
      "userremind":0,
      "devName":"xiaomi",
      "sysVersion":"11",
      "appVersion":"1.1",
      "platform":1,
      "createTime":"2016-06-22T08:23:12.000Z"
    }
  ]
}
```

返回字段说明：

字段名类型说明

``` js

code number
extData array
   id number问题id
   uid number战盟id
   email string邮箱地址
   content string内容
   picurl string图片地址
   logurl string日志地址
   answer_num number回复数
   serviceremind number客服提醒1有新回复0没有新回复
   userremind number玩家提醒1有新回复0没有新回复
   devName string设备
   sysVersion string系统信息
   appVersion stringAPP版本
   platform number平台　1 ios 2 android
   createTime string时间
```

[内网接口地址](http://192.168.191.94:8077/mobile/feedback/api/myproblems)

## 玩家回复函数ID：46914

最后修改时间：2016-06-2218:47:47

是否需要登录：否

HTTP请求方式：POST

请求参数：

参数名必选类型及范围说明

sign是string验证口令

uid是int战盟id

feedbackid是int问题id

content是string回复内容

picurl否string图片URL

返回结果：

``` js
{
  "code":0,
  "extData":{
    "id":3,
    "uid":"20005975",
    "feedbackid":"39",
    "content":"1111",
    "picurl":"",
    "type":2,
    "createTime":"2016-06-22T10:47:35.006Z"
  }
}
```

返回字段说明：

字段名类型说明

``` js
code number
extData object
   id number回复id
   uid string战盟id
   feedbackid string问题id
   content string内容
   picurl string图片地址
   type number1客服回复2玩家回复
   createTime string时间
```

[内网接口地址](http://192.168.191.94:8077/mobile/feedback/api/answer)

## (移动端）获取问题详情函数ID：46915

最后修改时间：2016-06-2218:53:09

是否需要登录：否

HTTP请求方式：GET

请求参数：

参数名 必选类型 及范围说明

feedbackid 是 int 问题详情

返回结果：

``` js
{
  "code":0,
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
      "createTime":"2016-06-22T07:45:42.000Z"
    },
    "answers":[
      {
        "id":1,
        "feedbackid":39,
        "uid":"dengyun@henhaoji.com",
        "content":"111",
        "picurl":"",
        "type":1,
        "createTime":"2016-06-22T07:49:12.000Z"
      }
    ]
  }
}
```

返回字段说明：

字段名类型说明

``` js
code number
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
   answers array
      feedbackid number问题id
      type number1客服回复2玩家回复
```

[内网接口地址](http://192.168.191.94:8077/mobile/feedback/api/problemdetail)

------

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