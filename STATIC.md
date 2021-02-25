![Logo Purratz ><](https://studiokami-stock.s3.fr-par.scw.cloud/purratz/logo-purratz-200.png)

# purratz - Statics assets endpoint

save your documents in:
```bash
src 
 | public
    | image
    | video
    | style
    |...
```
Purratz-cli create the public folder. You can see your public asset with : 
```
http://your-domain/public/[folder]/[document]
```
exemple : 

```
http://your-domain/public/image/logo.png
```

## Active the service

For activate the default routes for static assets, add in server.js : 
```javascript
Server.staticCtrl()
```
You can inject a custom function like this : 

```javascript
Server.staticCtrl(
        ()=> {
            return 'my function'
        }
)
```

Your custom function can acces to the context like this : 

```javascript
Server.staticCtrl(
        (ctx)=> {
            console.log(ctx.params.folder) // see the folder name
        }
)
```