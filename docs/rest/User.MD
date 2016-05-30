## 1. User /user

#### 1.1 Login
##### POST /user/login
Body (phone or email):
```sh
email: <user email>
password: <user password>
```
Response:
```sh
logged: true
token: <token>
```

#### 1.2 Logout
##### POST /user/logout
Body empty
Response:
```sh
{
  token: null,
  logoutedAt: '2016-04-07T09:55:21.162Z'
}

``