![Logo Purratz ><](https://github.com/kazerlelutin/purratz/blob/master/asset/logo-purratz-200.png?raw=true)

# purratz - DTO
DTO is **Data Transfer Object**. This feature check the POST request body and clean all key not include in your DTO.
This function verify the type of key et check if key is required. 

DTO return a valid object or false. 
If your key is not required, you can add this value for your keys : 
- "string"
- "array"
- "boolean"
- "object"
- "symbol"
- "function"
- "bigint"
- "undefined"

```javascript
import { Service } from "purratz"; // import Service for extend class

export default class PiratkatzService  extends Service{ 

    update(){
        const dtoLogin = {
            username: {type: 'string',isRequired :true},
            password: {type: 'string',isRequired :true},
            phone: 'string',
            level: 'number',
           
        };

        return this.dto(dtoLogin);
    }
}

```

### exemples

```javascript
// what you receive by request
{ 
    userName: "katherine",
    lastName: "cat",
    password: "mypass",
    wallet: 4568,
    card: ['456', '789']
}

const yourDTO = { 
                    userName: {type: "string", isRequired: true},
                    lastName: "string",
                    password: {type: "string", isRequired: true}
                }

this.dto(yourDTO) 

//return is : 
{ 
    userName: "katherine",
    lastName: "cat",
    password: "mypass",
}
```

```javascript
// what you receive by request
{ 
    userName: "katherine",
    lastName: "cat",
    wallet: 4568,
    card: ['456', '789']
}

const yourDTO = { 
                    userName: {type: "string", isRequired: true},
                    lastName: "string",
                    password: {type: "string", isRequired: true},
                    card: ['456', '789']
                }

this.dto(yourDTO) 

//return is : 
false //password is not present in form. 
```

```javascript
// what you receive by request
{ 
    userName: "katherine",
    lastName: "cat",
    password: 254,
    wallet: 4568,
    card: ['456', '789']
}

const yourDTO = { 
                    userName: {type: "string", isRequired: true},
                    lastName: "string",
                    password: {type: "string", isRequired: true},
                    card: ['456', '789']
                }

this.dto(yourDTO) 

//return is : 
false //wrong type for password
```