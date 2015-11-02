var opts = {};
/*
	opts = {
		method : {
			type : 'cookie',
			value : 'lang'//Name of the cookie
		},
		supported_lang : ['es','en,'gr'...],
		getStrings : function(lang,cb){
			//Example: load strings from a list and save it into req.lang_strings
		}
	}

*/
//Keept it simple
var methods = ['cookie','body'];
var functions =[
	function(req,res,next){
		if(req.cookies){
			var lang = opts.supported_lang[req.cookies] || null;
			if(lang){
				req.lang = lang || opts.supported_lang[0];
			}else{
				req.lang = opts.supported_lang[0];
			}
			if(opts.getStrings){
				opts.getStrings(lang,next);	
			}else{
				next();
			}
		}else{
			throw new Error('Cant find req.cookies, missing cookie-parser middleware');
		}
	},
	function(req,res,next){
		if(req.body){
			var lang = opts.supported_lang[req.body];
			if(lang){
				req.lang = lang || opts.supported_lang[0];
			}else{
				req.lang = opts.supported_lang[0];
			}
			if(opts.getStrings){
				opts.getStrings(lang,next);	
			}else{
				next();
			}
		}else{
			throw new Error('Cant find req.body, missing bodyparser middleware');
		}
	}];
module.exports = {
	middleware : function(options){
		opts = options;
		if(opts){
			var func = null;
			switch(opts.method){
				case methods[0]:
					func = functions[0];
					break;
				case methods[1]:
					func = functions[1];
					break;
				default:
					func = functions[0];
					break;
			}
			return func;
		}else{
			throw new Error('Needed options');
		}
	}
}
