![Logo Purratz ><](https://github.com/kazerlelutin/purratz/blob/master/asset/logo-purratz-200.png?raw=true)

# purratz - Utils functions
Some built-in utility functions.

## Pagination
Quick tools for pagination. You can use the response for send to front and for your database call.
```javascript
import {pagination} from "purratz";
const 
    limit = 25,
    page = 3,
    totItems = 95;

const pageObj = pagination(limit, page, totItems);

// pageObj return 
{
  limit: 25,
  currentPage: 3,
  offset: 50,
  totPage: 4,
  totItems: 95
}
```

## Email validator
this function check email format and return boolean. 
```javascript
import {emailValidator} from "purratz";

emailValidator(email) // return true or false
```

## Shuffle
you can use shuffle function for return one value or an array.

```javascript
import {shuffle} from "purratz"

/**
* @arr is your array
* @number is ne number of element what you can in return. 
* @duplicate is boolean. If is true, you accept to have two identicals value in return
**/

shuffle(arr, number, duplicate) // return any value.
```
Exemple for generate a key : 
```javascript
/**
* @ALPHABET is an array with letters (a to Z)
* @NUMBERS is an array with number (0 to 9)
**/
import {shuffle,ALPHABET, NUMBERS} from "purratz"; 

 shuffle([...ALPHABET, ...NUMBERS], 12, true).join('') // return string like "14def58sd2zh"
 shuffle(NUMBERS, 3, false) // return array like [8,5,2]

```

Shuffle function use **getRandomInt**. You have access to this function for generate shuffle number : 
```javascript
import {getRandomInt} from "purratz"

getRandomInt(min, max) // return Number between min and max
```