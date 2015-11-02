# express-lang
A simple way to change the languaje of the web.

Example:

```
var express = require('express');
var expressLang = require(__dirname + '\express-lang.js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

var opts = {
	method : 'cookie',
	name : 'lang',
	supported_lang : ['es','en','gr'],
	getStrings : function(req,res,cb){
		//Code to load languaje strings to req.lang_strings
		cb();
	}
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLang.middleware(opts));
```
### NPM install
you can install it using npm:

```
var expressLang = require('express-languaje);
```

### How it Works
The middleware reads the cookie or the body parameter defined by the 'name' field. Then creates a variable in req.lang that contains the languaje that wants the user (req.lang = req.cookies[name]).
The getStrings function define the form of load the strings in the system, its an optional parameter.

### Options:

#### Method
['cookie','body']
Selects the method of reading the languaje.

#### Name
Names the cookie or the body parameter.

#### Supported Languajes
The list of the supported languages.

#### Strings
This function defines the method of loading the strings depending on the language. 


