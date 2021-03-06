var opts = {};
/*
	opts = {
		method : 'cookie',
		name : 'lang',
		supported_lang : ['es','en,'gr'...],
		getStrings : function(lang,cb){
			//Example: load strings from a list and save it into req.lang_strings
		}
	}

*/
//Keept it simple
var methods = ['cookie','body','req-accept'];
var functions =[
	function(req,res,next){
		if(req.cookies){
			var fin = true;
			var i = 0;
			var lang = req.cookies[opts.name];
			var support = false;
			while(fin && i < opts.supported_lang.length){
				if(opts.supported_lang[i] == lang){
					support = true;
					fin = false;
					break;
				}
				i++;
			}
			if(support){
				req.lang = req.cookies[opts.name];
			}else{
				req.lang = opts.supported_lang[0];
			}
			if(opts.getStrings){
				opts.getStrings(req,res,next);
			}else{
				next();
			}
		}else{
			throw new Error('Cant find req.cookies, missing cookie-parser middleware');
		}
	},
	function(req,res,next){
		if(req.body){var fin = true;
			var i = 0;
			var lang = req.body[opts.name];
			var support = false;
			while(fin && i < opts.supported_lang.length){
				if(opts.supported_lang[i] == lang){
					support = true;
					fin = false;
					break;
				}
				i++;
			}
			if(support){
				req.lang = req.body[opts.name];
			}else{
				req.lang = opts.supported_lang[0];
			}
			if(opts.getStrings){
				opts.getStrings(req,res,next);
			}else{
				next();
			}
		}else{
			throw new Error('Cant find req.body, missing bodyparser middleware');
		}
	},
	function(req,res,next){
		var lang = req.acceptsLanguages(opts.supported_lang);
		if(lang == false){
			req.lang = opts.supported_lang[0];
			if(opts.getStrings){
				opts.getStrings(req,res,next);
			}else{
				next();
			}
		}else if(lang){
			req.lang = lang;
			if(opts.getStrings){
				opts.getStrings(req,res,next);
			}else{
				next();
			}
		}else{
			throw new Error('Cant find Accept-Language');
		}
	}];
module.exports = function(options){
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
			case methods[2]:
				func = functions[2];
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
