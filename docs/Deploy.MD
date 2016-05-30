# Deploy project to server
##### Requirements:
1. Node.js 6.2.*
2. MongoDB 3.2.*
3. pm2
4. nginx

##### Installing:
```sh
$ git clone -b develop [git-repo-url] api.koa2.dev
$ cd api.koa2.dev
$ npm i
```
Compile ES7 features to ES6 syntax and put compiled files to dist folder
```sh
$ npm run compileAndTest
```

Nginx configure
Create file /etc/nginx/sites-available/api.koa2.dev (change server_name and port to yours)
```sh
server {
    listen 80;

    server_name api.koa2.dev www.api.koa2.dev;

    location / {
        proxy_pass http://localhost:3009;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Create nginx symlink and restart nginx service
```sh
$ sudo ln -s /etc/nginx/sites-available/api.koa2.dev /etc/nginx/sites-enabled/
$ sudo service nginx restart
```

Run pm2 script (change PORT and --name to yours)
```sh
$ sudo env HOME=/var/www NODE_ENV=production PORT=3009 NODE_CONFIG='{"mongoose":{"uri":"mongodb://localhost/koa2_prod"}}' pm2 start index.js -f --name "api.koa2.dev"
```
Open link, that you configured in nginx and you should see json like this:
> { app: "koa2_app_acl", error: "Not Found", version: "0.0.1" }

##### Update changes:
```sh
$ cd /var/www/api.koa2.dev
$ git pull origin master
```

Install new modules
```sh
$ npm intall
```

Compile ES7 features to ES6 syntax and put compiled files to dist folder and run tests
```sh
$ npm run compileAndTest
```

Restart pm2 process, change process name (api.koa2.dev) for yours
```sh
$ sudo env HOME=/var/www pm2 restart api.koa2.dev
```
Open link, that you configured in nginx and you should see json like this:
> { app: "AEKTrading koa2_app_acl", error: "Not Found", version: "0.0.2" }
