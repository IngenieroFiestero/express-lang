var express_lang = require(__dirname + '../../express-lang.js');
var opts = {
	method : 'body',
	name : 'lang',
	supported_lang : ['es','en','gr'],
	getStrings : function(req,res,cb){
		console.log('It works?');
		console.log(req);
		cb();
	}
}
var middleware = express_lang(opts);
middleware({cookies : {'lang' : 'en','lang2' : 'gr'},body : {'lang' : 'gr'}},{},function(){
	console.log('It works!');
});