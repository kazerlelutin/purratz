![Logo Purratz ><](https://studiokami-stock.s3.fr-par.scw.cloud/purratz/logo-purratz-200.png)

# purratz - Guard

You can add a middleware for control the access to the group routes.

***note:** If you use guard in lot of controller, you can use `{ctrl}` and create a new controller.
If you use `{Ctrl}`, you must import your routes without guard before your guarded routes.*
```javascript
import { ctrl }  from "purratz";
import PiratzService from "./piratkatz.service";
import adminGuard from "./../guards/adminGuard";
const Ctrl = new ctrl()

Ctrl.initService(PiratzService); // inject your service

Ctrl.guard(adminGuard); // inject your GUARD Middleware

Ctrl.get('/purr',_=> Ctrl.service().purr());
Ctrl.get('/re/:id',_=> Ctrl.service().reqWithParams());
Ctrl.get('/woof',_=> Ctrl.service().woof());
Ctrl.get('/async', _=> Ctrl.service().bodyAsync());

export default Ctrl.export('/katz');
```
you can active guard for all route like that : 

```javascript
Ctrl.guard(adminGuard, true); // True active cover
```

Or for select routes :

```javascript
import { Ctrl }  from "purratz";
import PiratzService from "./piratkatz.service";
import adminGuard from "./../guards/adminGuard";

Ctrl.initService(PiratzService);

Ctrl.guard(adminGuard); // inject your GUARD Middleware

Ctrl.get('/purr',_=> Ctrl.service().purr(), true); //TRUE active guard
Ctrl.get('/re/:id',_=> Ctrl.service().reqWithParams());
Ctrl.get('/woof',_=> Ctrl.service().woof(), true); //TRUE active guard
Ctrl.get('/async', _=> Ctrl.service().bodyAsync());

export default Ctrl.export('/katz');
```

## Your Guard function 

The controller guard take simple function (you can use async function).\
Your function have access to **CTX**. Just add in arg "ctx".\
You can return a **boolean** or object : 
```javascript
export default async function guard(ctx) {
    //make thing
    return false
}
```
if function return false, the body return **401 status** and message is **unauthorized**.\
for continue after guard control, just return **true**.\
If you return **object**, guard is consider to **false**. But you can custom **status** and **message**.
```javascript
export default async function guard(ctx) {
//make thing
    return {
        status: 403,
        message: "My unauthorized message"
    }
}
```
