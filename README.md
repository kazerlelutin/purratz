![Logo Purratz ><](https://studiokami-stock.s3.fr-par.scw.cloud/purratz/logo-purratz-200.png)

# purratz
Micro back-end framework based on Koa. Plugin for auth, database coming soon.\

### purratz doc
to access all the documentation, go to the [github purratz](https://github.com/kazerlelutin/purratz/blob/master/README.md).

#### Version 1.1.1
Add jsDocs.

##### New Feature : MultiMiddleware
You can now add a second middleware in your controller. 
```javascript
import { Ctrl }  from "purratz";
import PiratzService from "./piratkatz.service";

Ctrl.initService(PiratzService); // inject your service
Ctrl.guard(myGuard); // inject your service
Ctrl.get('/purr',_=> Ctrl.service().purr(), ()=> 'second middleware'); // With second Middleware
Ctrl.get('/wouaf',_=> Ctrl.service().wouaf(), true, ()=> 'second middleware'); // With second Middleware AND guard
Ctrl.get('/forbidden',_=> Ctrl.service().forbidden(), true); // With just a guard.

export default Ctrl.export('/');
```

## Getting Started

install Purratz from npm :

```bash
npm install --save purratz
```

You can use Purratz-cli from npm :
```bash
npm install -g purratz-cli
```

and use this command for create a new project with Purratz-cli: 

```bash
purratz-create-app
```

### import / require 

Purratz-cli support import / export. If you use just Purratz, use require(). 

### Create a server: 

Default port is `3005`. For change, add `PORT` in `.env`.\
#### Simple mode 
You can use the simple mode. 
The CORS is enabled and the body parser accept 'JSON, TEXT and FORM'.

```javascript
import server from 'purratz';
server.autoConfig();
```

#### Classic mode 

```javascript
import { Server }  from 'purratz';
    const corsOptions = {
        credential: true
    };
const parserOptions = ['text','json'];

Server.cors(corsOptions);
Server.bodyParser(parserOptions);
```

### Create a controller
First, you must create a folder in **src**.\
Exemple : 
```
piratz
```
then, create file **name.controller.js**. Name is a same of **folder**.\
Exemple: 
```
piratz.controller.js
```
You must import ctrl from Purratz : 
```javascript
import { Ctrl } from "purratz";
```
or 
```javascript
import { ctrl } from "purratz";
const Ctrl = new ctrl();
```
*You can fix problem with guard like this* 

and export your controller with your global endpoint: 
```javascript
export default Ctrl.export('/piratz');
```
Now, you can add routes  : 
```javascript
import { Ctrl } from "purratz";

Ctrl.get('/string', _=> Ctrl.ctx("Hello World !"));
// return "Hello World !"

Ctrl.get('/object', _=> Ctrl.ctx({data: "Hello World !", status: 200})); 
//return "{data: Hello World !}"

Ctrl.get('/withfunc', _=> Ctrl.ctx(()=> {
    return {message: "Hello World !", status: 200}
}));

//return "{message: Hello World !}"

export default Ctrl.export('/cat');
```
with **Ctrl.ctx(path, service)**, you can return a string, an object, number, 
boolean or function (but function must be return a value).
If return an object with **status** key, this status is add to the response status and it's
don't appear in response body.\

#### verb
you can use verb :
- Ctrl.get()
- Ctrl.post()
- Ctrl.delete()
- Ctrl.put()

#### Adding routes in server
In your **index**, add this: 
```javascript
import piratzCtrl from "./src/piratz/piratz.controller";

server.addRoutes(piratzCtrl);
```

**server.addRoutes()** can take one controller or array of controllers.
```javascript
import piratzCtrl from "./src/piratz/piratz.controller";
import someCtrl from "./src/some/some.controller";

server.addRoutes([
    piratzCtrl,
    someCtrl
]);
```
### Service for good controller
Ctrl.ctx() is a basic method for return value with route. 
### create a service

you can inject a service in controller : 
```javascript
import { Ctrl }  from "purratz";
import PiratzService from "./piratkatz.service";

Ctrl.initService(PiratzService); // inject your service
Ctrl.get('/purr',_=> Ctrl.service().purr()); // use your service in controller
Ctrl.get('/re/:id',_=> Ctrl.service().reqWithParams());
Ctrl.get('/woof',_=> Ctrl.service().woof());
Ctrl.get('/async', _=> Ctrl.service().bodyAsync());

export default Ctrl.export('/');
```
 ### use parent class Service
 For inject ctx and next and global functions. 
 your function must return a any value. Return is inject in body response. 
 Exemple of service : 
 
```javascript
import { Service } from "purratz"; // import Service for extend class

export default class PiratkatzService  extends Service{ 

    purr() {return "RonRonRonRonRonRon..."} //just return a string.

    async reqWithParams(){
        const id = this.params.id // acces to GET params with this.params.
        return `Your ID is ${id}`; // inject return in response body.
    }

    async bodyAsync(){
        const p1 =  new Promise(resolve => {
            resolve("Cool !")
        });
        return this.withPromise(p1) //you can use this.withPromise() for return async result. 
    }

    woof(){
        //return a object.
        return {
            status: 403,
            message: "my message",
            dog: 'medor',
            say: "Wouaf wouaf!"
        }
    }
}
```

## add a second middleware 
you can inject a second middleware in your controller : 

```javascript
import { Ctrl }  from "purratz";
import PiratzService from "./piratkatz.service";

Ctrl.initService(PiratzService); // inject your service
Ctrl.guard(myGuard); // inject your service
Ctrl.get('/purr',_=> Ctrl.service().purr(), ()=> 'second middleware'); // With second Middleware
Ctrl.get('/wouaf',_=> Ctrl.service().wouaf(), true, ()=> 'second middleware'); // With second Middleware AND guard
Ctrl.get('/forbidden',_=> Ctrl.service().forbidden(), true); // With just a guard.

export default Ctrl.export('/');
```
## Statics endpoints assets
See the doc [here](STATIC.md).

## DTO
for add DTO. See the doc [here](DTO.md).

### Guard
Add middleware route control access. See the doc [here](GUARD.md).

## Utils functions
Some built-in utility functions. See the doc [here](UTILS.md).