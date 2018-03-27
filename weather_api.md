# 天气 API 介绍

## https://test-miniprogram.com

### GET /api/weather/now

#### 参数

| 参数名 | 类型   | 描述   |必填
|:-------|:-------|:-------|:--|
| city   | String | 城市名 |是|

#### 参考返回

```json
{
    "code": 200,
    "message": "success",
    "result": {
        "now": {
            "temp": 0,
            "weather": "lightrain"
        },
        "today": {
            "minTemp": 0,
            "maxTemp": 11
        },
        "forecast": [
            {
                "weather": "lightrain",
                "temp": 0,
                "id": 0
            },
            {
                "weather": "lightrain",
                "temp": -2,
                "id": 1
            },
            {
                "weather": "lightrain",
                "temp": 11,
                "id": 2
            },
            {
                "weather": "sunny",
                "temp": 18,
                "id": 3
            },
            {
                "weather": "lightrain",
                "temp": 8,
                "id": 4
            },
            {
                "weather": "sunny",
                "temp": 10,
                "id": 5
            },
            {
                "weather": "lightrain",
                "temp": 1,
                "id": 6
            },
            {
                "weather": "heavyrain",
                "temp": -7,
                "id": 7
            }
        ]
    }
}
```
---

### GET /api/weather/future

#### 参数

| 参数名 | 类型      | 描述   |必填|
|:-------|:----------|:-------|:--|
| city   | String    | 城市名 |是|
| time   | TimeStamp | 时间戳 |是|

#### 参考返回

```json
{
    "code": 200,
    "message": "success",
    "result": [
        {
            "weather": "overcast",
            "minTemp": 3,
            "maxTemp": 13
        },
        {
            "weather": "sunny",
            "minTemp": 1,
            "maxTemp": 11
        },
        {
            "weather": "snow",
            "minTemp": -8,
            "maxTemp": -3
        },
        {
            "weather": "overcast",
            "minTemp": 3,
            "maxTemp": 17
        },
        {
            "weather": "cloudy",
            "minTemp": 3,
            "maxTemp": 19
        },
        {
            "weather": "cloudy",
            "minTemp": 6,
            "maxTemp": 8
        },
        {
            "weather": "cloudy",
            "minTemp": 5,
            "maxTemp": 8
        }
    ]
}
```
