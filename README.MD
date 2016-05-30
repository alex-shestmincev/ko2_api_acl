# koa2_app_acl backend docs
## Links
  - [Git](https://github.com/klik1301/ko2_api_acl.git)
  - [REST Api documentation](docs/RESTApi.MD)
  - [Deploy instructions](docs/Deploy.MD)

## Development
##### Requirements:
1. Node.js 6.2.*
2. MongoDB 3.2.*

##### Installing:
```sh
$ git clone -b develop [git-repo-url] api.koa2.dev
$ cd api.koa2.dev
$ npm i
$ npm run dev
```
Open link [http://localhost:3333](http://localhost:3333) and you should see json like this:
> { app: "koa2_app_acl", error: "Not Found", version: "0.0.1" }

##### Run tests
```sh
$ npm test                              // run all tests
```
