# Smart Cities

Currently hosted [here](https://intense-hollows-59794.herokuapp.com/dashboard) using db we made in class

## Installation (local)

In root and client directories:

```bash
npm install
```

Following steps are temporary while we don't have an actual db

Make a db-config.js file and put that in root (I used my eniac db):
```javascript
module.exports = {
  host: "host",
  user: "user",
  password: "password",
  database: "database"
};
```
Go to routes.js (also in root):
- uncomment line 1
- comment lines 5- 10


## Run

In root and client:

```bash
npm start
```
