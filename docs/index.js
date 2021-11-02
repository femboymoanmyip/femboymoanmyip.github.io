(function(){var e=e||{};e.scope={};e.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};e.arrayIterator=function(a){return{next:e.arrayIteratorImpl(a)}};e.ASSUME_ES5=!1;e.ASSUME_NO_NATIVE_MAP=!1;e.ASSUME_NO_NATIVE_SET=!1;e.SIMPLE_FROUND_POLYFILL=!1;e.ISOLATE_POLYFILLS=!1;e.FORCE_POLYFILL_PROMISE=!1;e.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;
e.defineProperty=e.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};e.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};e.global=e.getGlobal(this);
e.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");e.TRUST_ES6_POLYFILLS=!e.ISOLATE_POLYFILLS||e.IS_SYMBOL_NATIVE;e.polyfills={};e.propertyToPolyfillSymbol={};e.POLYFILL_PREFIX="$jscp$";e.polyfill=function(a,b,c,d){b&&(e.ISOLATE_POLYFILLS?e.polyfillIsolated(a,b,c,d):e.polyfillUnisolated(a,b,c,d))};
e.polyfillUnisolated=function(a,b){var c=e.global;a=a.split(".");for(var d=0;d<a.length-1;d++){var f=a[d];if(!(f in c))return;c=c[f]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&e.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
e.polyfillIsolated=function(a,b,c){var d=a.split(".");a=1===d.length;var f=d[0];f=!a&&f in e.polyfills?e.polyfills:e.global;for(var g=0;g<d.length-1;g++){var k=d[g];if(!(k in f))return;f=f[k]}d=d[d.length-1];c=e.IS_SYMBOL_NATIVE&&"es6"===c?f[d]:null;b=b(c);null!=b&&(a?e.defineProperty(e.polyfills,d,{configurable:!0,writable:!0,value:b}):b!==c&&(void 0===e.propertyToPolyfillSymbol[d]&&(a=1E9*Math.random()>>>0,e.propertyToPolyfillSymbol[d]=e.IS_SYMBOL_NATIVE?e.global.Symbol(d):e.POLYFILL_PREFIX+a+"$"+
d),e.defineProperty(f,e.propertyToPolyfillSymbol[d],{configurable:!0,writable:!0,value:b})))};e.initSymbol=function(){};
e.polyfill("Symbol",function(a){function b(g){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c(d+(g||"")+"_"+f++,g)}function c(g,k){this.$jscomp$symbol$id_=g;e.defineProperty(this,"description",{configurable:!0,writable:!0,value:k})}if(a)return a;c.prototype.toString=function(){return this.$jscomp$symbol$id_};var d="jscomp_symbol_"+(1E9*Math.random()>>>0)+"_",f=0;return b},"es6","es3");
e.polyfill("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=e.global[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&e.defineProperty(d.prototype,a,{configurable:!0,writable:!0,value:function(){return e.iteratorPrototype(e.arrayIteratorImpl(this))}})}return a},"es6","es3");
e.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};e.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):e.arrayIterator(a)};e.arrayFromIterator=function(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c};e.arrayFromIterable=function(a){return a instanceof Array?a:e.arrayFromIterator(e.makeIterator(a))};
e.underscoreProtoCanBeSet=function(){var a={a:!0},b={};try{return b.__proto__=a,b.a}catch(c){}return!1};e.setPrototypeOf=e.TRUST_ES6_POLYFILLS&&"function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:e.underscoreProtoCanBeSet()?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null;e.generator={};e.generator.ensureIteratorResultIsObject_=function(a){if(!(a instanceof Object))throw new TypeError("Iterator result "+a+" is not an object");};
e.generator.Context=function(){this.isRunning_=!1;this.yieldAllIterator_=null;this.yieldResult=void 0;this.nextAddress=1;this.finallyAddress_=this.catchAddress_=0;this.finallyContexts_=this.abruptCompletion_=null};e.generator.Context.prototype.start_=function(){if(this.isRunning_)throw new TypeError("Generator is already running");this.isRunning_=!0};e.generator.Context.prototype.stop_=function(){this.isRunning_=!1};
e.generator.Context.prototype.jumpToErrorHandler_=function(){this.nextAddress=this.catchAddress_||this.finallyAddress_};e.generator.Context.prototype.next_=function(a){this.yieldResult=a};e.generator.Context.prototype.throw_=function(a){this.abruptCompletion_={exception:a,isException:!0};this.jumpToErrorHandler_()};e.generator.Context.prototype.return=function(a){this.abruptCompletion_={return:a};this.nextAddress=this.finallyAddress_};
e.generator.Context.prototype.jumpThroughFinallyBlocks=function(a){this.abruptCompletion_={jumpTo:a};this.nextAddress=this.finallyAddress_};e.generator.Context.prototype.yield=function(a,b){this.nextAddress=b;return{value:a}};e.generator.Context.prototype.yieldAll=function(a,b){a=e.makeIterator(a);var c=a.next();e.generator.ensureIteratorResultIsObject_(c);if(c.done)this.yieldResult=c.value,this.nextAddress=b;else return this.yieldAllIterator_=a,this.yield(c.value,b)};
e.generator.Context.prototype.jumpTo=function(a){this.nextAddress=a};e.generator.Context.prototype.jumpToEnd=function(){this.nextAddress=0};e.generator.Context.prototype.setCatchFinallyBlocks=function(a,b){this.catchAddress_=a;void 0!=b&&(this.finallyAddress_=b)};e.generator.Context.prototype.setFinallyBlock=function(a){this.catchAddress_=0;this.finallyAddress_=a||0};e.generator.Context.prototype.leaveTryBlock=function(a,b){this.nextAddress=a;this.catchAddress_=b||0};
e.generator.Context.prototype.enterCatchBlock=function(a){this.catchAddress_=a||0;a=this.abruptCompletion_.exception;this.abruptCompletion_=null;return a};e.generator.Context.prototype.enterFinallyBlock=function(a,b,c){c?this.finallyContexts_[c]=this.abruptCompletion_:this.finallyContexts_=[this.abruptCompletion_];this.catchAddress_=a||0;this.finallyAddress_=b||0};
e.generator.Context.prototype.leaveFinallyBlock=function(a,b){b=this.finallyContexts_.splice(b||0)[0];if(b=this.abruptCompletion_=this.abruptCompletion_||b){if(b.isException)return this.jumpToErrorHandler_();void 0!=b.jumpTo&&this.finallyAddress_<b.jumpTo?(this.nextAddress=b.jumpTo,this.abruptCompletion_=null):this.nextAddress=this.finallyAddress_}else this.nextAddress=a};e.generator.Context.prototype.forIn=function(a){return new e.generator.Context.PropertyIterator(a)};
e.generator.Context.PropertyIterator=function(a){this.object_=a;this.properties_=[];for(var b in a)this.properties_.push(b);this.properties_.reverse()};e.generator.Context.PropertyIterator.prototype.getNext=function(){for(;0<this.properties_.length;){var a=this.properties_.pop();if(a in this.object_)return a}return null};e.generator.Engine_=function(a){this.context_=new e.generator.Context;this.program_=a};
e.generator.Engine_.prototype.next_=function(a){this.context_.start_();if(this.context_.yieldAllIterator_)return this.yieldAllStep_(this.context_.yieldAllIterator_.next,a,this.context_.next_);this.context_.next_(a);return this.nextStep_()};e.generator.Engine_.prototype.return_=function(a){this.context_.start_();var b=this.context_.yieldAllIterator_;if(b)return this.yieldAllStep_("return"in b?b["return"]:function(c){return{value:c,done:!0}},a,this.context_.return);this.context_.return(a);return this.nextStep_()};
e.generator.Engine_.prototype.throw_=function(a){this.context_.start_();if(this.context_.yieldAllIterator_)return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"],a,this.context_.next_);this.context_.throw_(a);return this.nextStep_()};
e.generator.Engine_.prototype.yieldAllStep_=function(a,b,c){try{var d=a.call(this.context_.yieldAllIterator_,b);e.generator.ensureIteratorResultIsObject_(d);if(!d.done)return this.context_.stop_(),d;var f=d.value}catch(g){return this.context_.yieldAllIterator_=null,this.context_.throw_(g),this.nextStep_()}this.context_.yieldAllIterator_=null;c.call(this.context_,f);return this.nextStep_()};
e.generator.Engine_.prototype.nextStep_=function(){for(;this.context_.nextAddress;)try{var a=this.program_(this.context_);if(a)return this.context_.stop_(),{value:a.value,done:!1}}catch(b){this.context_.yieldResult=void 0,this.context_.throw_(b)}this.context_.stop_();if(this.context_.abruptCompletion_){a=this.context_.abruptCompletion_;this.context_.abruptCompletion_=null;if(a.isException)throw a.exception;return{value:a.return,done:!0}}return{value:void 0,done:!0}};
e.generator.Generator_=function(a){this.next=function(b){return a.next_(b)};this.throw=function(b){return a.throw_(b)};this.return=function(b){return a.return_(b)};this[Symbol.iterator]=function(){return this}};e.generator.createGenerator=function(a,b){b=new e.generator.Generator_(new e.generator.Engine_(b));e.setPrototypeOf&&a.prototype&&e.setPrototypeOf(b,a.prototype);return b};
e.asyncExecutePromiseGenerator=function(a){function b(d){return a.next(d)}function c(d){return a.throw(d)}return new Promise(function(d,f){function g(k){k.done?d(k.value):Promise.resolve(k.value).then(b,c).then(g,f)}g(a.next())})};e.asyncExecutePromiseGeneratorFunction=function(a){return e.asyncExecutePromiseGenerator(a())};e.asyncExecutePromiseGeneratorProgram=function(a){return e.asyncExecutePromiseGenerator(new e.generator.Generator_(new e.generator.Engine_(a)))};
function h(a,b,c){return a&&(a.hasOwnProperty("__class__")||"string"==typeof a||a instanceof String)?(c&&Object.defineProperty(a,c,{value:function(){var d=[].slice.apply(arguments);return b.apply(null,[a].concat(d))},writable:!0,enumerable:!0,configurable:!0}),function(){var d=[].slice.apply(arguments);return b.apply(null,[a.__proxy__?a.__proxy__:a].concat(d))}):b}
var n={__name__:"type",__bases__:[],__new__:function(a,b,c,d){function f(){var L=[].slice.apply(arguments);return f.__new__(L)}for(var g=c.length-1;0<=g;g--){var k=c[g],m;for(m in k){var r=Object.getOwnPropertyDescriptor(k,m);null!=r&&Object.defineProperty(f,m,r)}r=e.makeIterator(Object.getOwnPropertySymbols(k));for(var l=r.next();!l.done;l=r.next()){l=l.value;var p=Object.getOwnPropertyDescriptor(k,l);Object.defineProperty(f,l,p)}}f.__metaclass__=a;f.__name__=b.startsWith("py_")?b.slice(3):b;f.__bases__=
c;for(m in d)r=Object.getOwnPropertyDescriptor(d,m),Object.defineProperty(f,m,r);a=e.makeIterator(Object.getOwnPropertySymbols(d));for(l=a.next();!l.done;l=a.next())b=l.value,c=Object.getOwnPropertyDescriptor(d,b),Object.defineProperty(f,b,c);return f}};n.__metaclass__=n;
var q={__init__:function(){},__metaclass__:n,__name__:"object",__bases__:[],__new__:function(a){var b=Object.create(this,{__class__:{value:this,enumerable:!0}});if("__getattr__"in this||"__setattr__"in this)b.__proxy__=new Proxy(b,{get:function(c,d){var f=c[d];return void 0==f?c.__getattr__(d):f},set:function(c,d,f){try{c.__setattr__(d,f)}catch(g){c[d]=f}return!0}}),b=b.__proxy__;this.__init__.apply(null,[b].concat(a));return b}};
function t(a,b,c,d){void 0===d&&(d=b[0].__metaclass__);return d.__new__(d,a,b,c)}function u(a){a.__kwargtrans__=null;a.constructor=Object;return a}function v(a,b,c){a.hasOwnProperty(b)||Object.defineProperty(a,b,c)}function w(a){return a.startswith("__")&&a.endswith("__")||"constructor"==a||a.startswith("py_")}function x(a){if(void 0===a||null===a)return 0;if(a.__len__ instanceof Function)return a.__len__();if(void 0!==a.length)return a.length;var b=0,c;for(c in a)w(c)||b++;return b}
function y(a){if("inf"==a)return Infinity;if("-inf"==a)return-Infinity;if("nan"==a)return NaN;if(isNaN(parseFloat(a))){if(!1===a)return 0;if(!0===a)return 1;throw z("could not convert string to float: '"+A(a)+"'",Error());}return+a}y.__name__="float";y.__bases__=[q];function B(a){return y(a)|0}B.__name__="int";B.__bases__=[q];
function C(a){return!!(void 0===a||null===a?0:0<=["boolean","number"].indexOf(typeof a)?a:a.__bool__ instanceof Function?a.__bool__()&&a:a.__len__ instanceof Function?0!==a.__len__()&&a:a instanceof Function?a:0!==x(a)&&a)}C.__name__="bool";C.__bases__=[B];function D(a){var b=typeof a;if("object"==b)try{return"__class__"in a?a.__class__:q}catch(c){return b}else return"boolean"==b?C:"string"==b?A:"number"==b?0==a%1?B:y:null}
function E(a,b){if(b instanceof Array){b=e.makeIterator(b);for(var c=b.next();!c.done;c=b.next())if(E(a,c.value))return!0;return!1}try{c=a;if(c==b)return!0;for(var d=[].slice.call(c.__bases__);d.length;){c=d.shift();if(c==b)return!0;c.__bases__.length&&(d=[].slice.call(c.__bases__).concat(d))}return!1}catch(f){return a==b||b==q}}function F(a,b){try{return"__class__"in a?E(a.__class__,b):E(D(a),b)}catch(c){return E(D(a),b)}}
function G(a){try{return a.__repr__()}catch(g){try{return a.__str__()}catch(k){try{if(null==a)return"None";if(a.constructor==Object){var b="{",c=!1,d;for(d in a)if(!w(d)){var f=d.isnumeric()?d:"'"+d+"'";c?b+=", ":c=!0;b+=f+": "+G(a[d])}return b+"}"}return"boolean"==typeof a?a.toString().capitalize():a.toString()}catch(m){return"<object of type: "+typeof a+">"}}}}var aa=Math.abs;
function H(a){try{var b=a.__next__()}catch(c){b=a.next();if(b.done)throw I(Error());return b.value}if(void 0==b)throw I(Error());return b}function J(a){this.iterable=a;this.index=0}J.prototype.__next__=function(){if(this.index<this.iterable.length)return this.iterable[this.index++];throw I(Error());};function K(a){this.iterable=a;this.index=0}K.prototype.next=function(){return this.index<this.iterable.py_keys.length?{value:this.index++,done:!1}:{value:void 0,done:!0}};
function M(a){return a?Array.from(a):[]}Array.prototype.__class__=M;M.__name__="list";M.__bases__=[q];Array.prototype.__iter__=function(){return new J(this)};Array.prototype.__getslice__=function(a,b,c){0>a&&(a=this.length+a);null==b?b=this.length:0>b?b=this.length+b:b>this.length&&(b=this.length);if(1==c)return Array.prototype.slice.call(this,a,b);for(var d=M([]);a<b;a+=c)d.push(this[a]);return d};
Array.prototype.__setslice__=function(a,b,c,d){0>a&&(a=this.length+a);null==b?b=this.length:0>b&&(b=this.length+b);if(null==c)Array.prototype.splice.apply(this,[a,b-a].concat(d));else for(var f=0;a<b;a+=c)this[a]=d[f++]};
Array.prototype.__repr__=function(){if(this.__class__==N&&!this.length)return"set()";for(var a=this.__class__&&this.__class__!=M?this.__class__==O?"(":"{":"[",b=0;b<this.length;b++)b&&(a+=", "),a+=G(this[b]);this.__class__==O&&1==this.length&&(a+=",");return a+=this.__class__&&this.__class__!=M?this.__class__==O?")":"}":"]"};Array.prototype.__str__=Array.prototype.__repr__;Array.prototype.append=function(a){this.push(a)};Array.prototype.py_clear=function(){this.length=0};
Array.prototype.extend=function(a){this.push.apply(this,a)};Array.prototype.insert=function(a,b){this.splice(a,0,b)};Array.prototype.remove=function(a){a=this.indexOf(a);if(-1==a)throw z("list.remove(x): x not in list",Error());this.splice(a,1)};Array.prototype.index=function(a){return this.indexOf(a)};Array.prototype.py_pop=function(a){return void 0==a?this.pop():this.splice(a,1)[0]};Array.prototype.py_sort=function(){ba.apply(null,[this].concat([].slice.apply(arguments)))};
Array.prototype.__add__=function(a){return M(this.concat(a))};Array.prototype.__mul__=function(a){for(var b=this,c=1;c<a;c++)b=b.concat(this);return b};Array.prototype.__rmul__=Array.prototype.__mul__;function O(a){a=a?[].slice.apply(a):[];a.__class__=O;return a}O.__name__="tuple";O.__bases__=[q];function N(a){var b=[];if(a)for(var c=0;c<a.length;c++)b.add(a[c]);b.__class__=N;return b}N.__name__="set";N.__bases__=[q];
Array.prototype.__bindexOf__=function(a){a+="";for(var b=0,c=this.length-1;b<=c;){var d=(b+c)/2|0,f=this[d]+"";if(f<a)b=d+1;else if(f>a)c=d-1;else return d}return-1};Array.prototype.add=function(a){-1==this.indexOf(a)&&this.push(a)};Array.prototype.discard=function(a){a=this.indexOf(a);-1!=a&&this.splice(a,1)};Array.prototype.isdisjoint=function(a){this.sort();for(var b=0;b<a.length;b++)if(-1!=this.__bindexOf__(a[b]))return!1;return!0};
Array.prototype.issuperset=function(a){this.sort();for(var b=0;b<a.length;b++)if(-1==this.__bindexOf__(a[b]))return!1;return!0};Array.prototype.issubset=function(a){return N(a.slice()).issuperset(this)};Array.prototype.union=function(a){for(var b=N(this.slice().sort()),c=0;c<a.length;c++)-1==b.__bindexOf__(a[c])&&b.push(a[c]);return b};Array.prototype.intersection=function(a){this.sort();for(var b=N(),c=0;c<a.length;c++)-1!=this.__bindexOf__(a[c])&&b.push(a[c]);return b};
Array.prototype.difference=function(a){a=N(a.slice().sort());for(var b=N(),c=0;c<this.length;c++)-1==a.__bindexOf__(this[c])&&b.push(this[c]);return b};Array.prototype.symmetric_difference=function(a){return this.union(a).difference(this.intersection(a))};Array.prototype.py_update=function(){var a=[].concat.apply(this.slice(),arguments).sort();this.py_clear();for(var b=0;b<a.length;b++)a[b]!=a[b-1]&&this.push(a[b])};
Array.prototype.__eq__=function(a){if(this.length!=a.length)return!1;this.__class__==N&&(this.sort(),a.sort());for(var b=0;b<this.length;b++)if(this[b]!=a[b])return!1;return!0};Array.prototype.__ne__=function(a){return!this.__eq__(a)};Array.prototype.__le__=function(a){if(this.__class__==N)return this.issubset(a);for(var b=0;b<this.length;b++){if(this[b]>a[b])return!1;if(this[b]<a[b])break}return!0};
Array.prototype.__ge__=function(a){if(this.__class__==N)return this.issuperset(a);for(var b=0;b<this.length;b++){if(this[b]<a[b])return!1;if(this[b]>a[b])break}return!0};Array.prototype.__lt__=function(a){return this.__class__==N?this.issubset(a)&&!this.issuperset(a):!this.__ge__(a)};Array.prototype.__gt__=function(a){return this.__class__==N?this.issuperset(a)&&!this.issubset(a):!this.__le__(a)};
Uint8Array.prototype.__add__=function(a){var b=new Uint8Array(this.length+a.length);b.set(this);b.set(a,this.length);return b};Uint8Array.prototype.__mul__=function(a){for(var b=new Uint8Array(a*this.length),c=0;c<a;c++)b.set(this,c*this.length);return b};Uint8Array.prototype.__rmul__=Uint8Array.prototype.__mul__;function A(a){if("number"===typeof a)return a.toString();try{return a.__str__()}catch(b){try{return G(a)}catch(c){return String(a)}}}String.prototype.__class__=A;A.__name__="str";
A.__bases__=[q];String.prototype.__iter__=function(){new J(this)};String.prototype.__repr__=function(){return(-1==this.indexOf("'")?"'"+this+"'":'"'+this+'"').py_replace("\t","\\t").py_replace("\n","\\n")};String.prototype.__str__=function(){return this};String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};
String.prototype.endswith=function(a){if(a instanceof Array)for(var b=0;b<a.length;b++){if(this.slice(-a[b].length)==a[b])return!0}else return""==a||this.slice(-a.length)==a;return!1};String.prototype.find=function(a,b){return this.indexOf(a,b)};String.prototype.__getslice__=function(a,b,c){0>a&&(a=this.length+a);null==b?b=this.length:0>b&&(b=this.length+b);var d="";if(1==c)d=this.substring(a,b);else for(;a<b;a+=c)d=d.concat(this.charAt(a));return d};
v(String.prototype,"format",{get:function(){return h(this,function(a){var b=O([].slice.apply(arguments).slice(1)),c=0;return a.replace(/\{(\w*)\}/g,function(d,f){""==f&&(f=c++);if(f==+f)return void 0===b[f]?d:A(b[f]);for(var g=0;g<b.length;g++)if("object"==typeof b[g]&&void 0!==b[g][f])return A(b[g][f]);return d})})},enumerable:!0});String.prototype.isalnum=function(){return/^[0-9a-zA-Z]{1,}$/.test(this)};String.prototype.isalpha=function(){return/^[a-zA-Z]{1,}$/.test(this)};
String.prototype.isdecimal=function(){return/^[0-9]{1,}$/.test(this)};String.prototype.isdigit=function(){return this.isdecimal()};String.prototype.islower=function(){return/^[a-z]{1,}$/.test(this)};String.prototype.isupper=function(){return/^[A-Z]{1,}$/.test(this)};String.prototype.isspace=function(){return/^[\s]{1,}$/.test(this)};String.prototype.isnumeric=function(){return!isNaN(parseFloat(this))&&isFinite(this)};String.prototype.join=function(a){a=Array.from(a);return a.join(this)};
String.prototype.lower=function(){return this.toLowerCase()};String.prototype.py_replace=function(a,b,c){return this.split(a,c).join(b)};String.prototype.lstrip=function(){return this.replace(/^\s*/g,"")};String.prototype.rfind=function(a,b){return this.lastIndexOf(a,b)};String.prototype.rsplit=function(a,b){if(void 0==a||null==a){a=/\s+/;var c=this.strip()}else c=this;if(void 0==b||-1==b)return c.split(a);c=c.split(a);return b<c.length?(b=c.length-b,[c.slice(0,b).join(a)].concat(c.slice(b))):c};
String.prototype.rstrip=function(){return this.replace(/\s*$/g,"")};String.prototype.py_split=function(a,b){if(void 0==a||null==a){a=/\s+/;var c=this.strip()}else c=this;if(void 0==b||-1==b)return c.split(a);c=c.split(a);return b<c.length?c.slice(0,b).concat([c.slice(b).join(a)]):c};String.prototype.startswith=function(a){if(a instanceof Array)for(var b=0;b<a.length;b++){if(0==this.indexOf(a[b]))return!0}else return 0==this.indexOf(a);return!1};String.prototype.strip=function(){return this.trim()};
String.prototype.upper=function(){return this.toUpperCase()};String.prototype.__mul__=function(a){for(var b="",c=0;c<a;c++)b+=this;return b};String.prototype.__rmul__=String.prototype.__mul__;function ca(a){return this.hasOwnProperty(a)}function da(){var a=[],b;for(b in this)w(b)||a.push(b);return a}function ea(){var a=[],b;for(b in this)w(b)||a.push([b,this[b]]);return a}function fa(a){delete this[a]}function ha(){for(var a in this)delete this[a]}
function ia(a,b){var c=this[a];void 0==c&&(c=this["py_"+a]);return void 0==c?void 0==b?null:b:c}function ja(a,b){var c=this[a];if(void 0!=c)return c;b=void 0==b?null:b;return this[a]=b}function ka(a,b){var c=this[a];if(void 0!=c)return delete this[a],c;if(void 0===b)throw P(a,Error());return b}function la(){var a=Object.keys(this)[0];if(null==a)throw P("popitem(): dictionary is empty",Error());var b=O([a,this[a]]);delete this[a];return b}function ma(a){for(var b in a)this[b]=a[b]}
function na(){var a=[],b;for(b in this)w(b)||a.push(this[b]);return a}function oa(a){return this[a]}function pa(a,b){this[a]=b}
function Q(a){var b={};if(!a||a instanceof Array){if(a)for(var c=0;c<a.length;c++){var d=a[c];if(!(d instanceof Array)||2!=d.length)throw z("dict update sequence element #"+c+" has length "+d.length+"; 2 is required",Error());var f=d[0];d=d[1];!(a instanceof Array)&&a instanceof Object&&(F(a,Q)||(d=Q(d)));b[f]=d}}else if(F(a,Q))for(d=a.py_keys(),c=0;c<d.length;c++)f=d[c],b[f]=a[f];else if(a instanceof Object)b=a;else throw z("Invalid type of object for dict creation",Error());v(b,"__class__",{value:Q,
enumerable:!1,writable:!0});v(b,"__contains__",{value:ca,enumerable:!1});v(b,"py_keys",{value:da,enumerable:!1});v(b,"__iter__",{value:function(){new J(this.py_keys())},enumerable:!1});v(b,Symbol.iterator,{value:function(){new K(this.py_keys())},enumerable:!1});v(b,"py_items",{value:ea,enumerable:!1});v(b,"py_del",{value:fa,enumerable:!1});v(b,"py_clear",{value:ha,enumerable:!1});v(b,"py_get",{value:ia,enumerable:!1});v(b,"py_setdefault",{value:ja,enumerable:!1});v(b,"py_pop",{value:ka,enumerable:!1});
v(b,"py_popitem",{value:la,enumerable:!1});v(b,"py_update",{value:ma,enumerable:!1});v(b,"py_values",{value:na,enumerable:!1});v(b,"__getitem__",{value:oa,enumerable:!1});v(b,"__setitem__",{value:pa,enumerable:!1});return b}Q.__name__="dict";Q.__bases__=[q];v(Function.prototype,"__setdoc__",{value:function(a){this.__doc__=a;return this},enumerable:!1});function R(a,b){return"object"==typeof a&&"__mod__"in a?a.__mod__(b):"object"==typeof b&&"__rmod__"in b?b.__rmod__(a):(a%b+b)%b}
var qa=t("BaseException",[q],{__module__:"org.transcrypt.__runtime__"}),S=t("Exception",[qa],{__module__:"org.transcrypt.__runtime__",get __init__(){return h(this,function(a){var b=Q();if(arguments.length){var c=arguments.length-1;if(arguments[c]&&arguments[c].hasOwnProperty("__kwargtrans__")){var d=arguments[c--],f;for(f in d)switch(f){case "self":a=d[f];break;default:b[f]=d[f]}delete b.__kwargtrans__}c=O([].slice.apply(arguments).slice(1,c+1))}else c=O();a.__args__=c;a.stack=null!=b.error?b.error.stack:
Error?Error().stack:"No stack trace available"})},get __repr__(){return h(this,function(a){return 1<x(a.__args__)?"{}{}".format(a.__class__.__name__,G(O(a.__args__))):x(a.__args__)?"{}({})".format(a.__class__.__name__,G(a.__args__[0])):"{}()".format(a.__class__.__name__)})},get __str__(){return h(this,function(a){return 1<x(a.__args__)?A(O(a.__args__)):x(a.__args__)?A(a.__args__[0]):""})}});
t("IterableError",[S],{__module__:"org.transcrypt.__runtime__",get __init__(){return h(this,function(a,b){S.__init__(a,"Can't iterate over non-iterable",u({error:b}))})}});
var I=t("StopIteration",[S],{__module__:"org.transcrypt.__runtime__",get __init__(){return h(this,function(a,b){S.__init__(a,"Iterator exhausted",u({error:b}))})}}),z=t("ValueError",[S],{__module__:"org.transcrypt.__runtime__",get __init__(){return h(this,function(a,b,c){S.__init__(a,b,u({error:c}))})}}),P=t("KeyError",[S],{__module__:"org.transcrypt.__runtime__",get __init__(){return h(this,function(a,b,c){S.__init__(a,b,u({error:c}))})}});
t("AssertionError",[S],{__module__:"org.transcrypt.__runtime__",get __init__(){return h(this,function(a,b,c){b?S.__init__(a,b,u({error:c})):S.__init__(a,u({error:c}))})}});t("NotImplementedError",[S],{__module__:"org.transcrypt.__runtime__",get __init__(){return h(this,function(a,b,c){S.__init__(a,b,u({error:c}))})}});t("IndexError",[S],{__module__:"org.transcrypt.__runtime__",get __init__(){return h(this,function(a,b,c){S.__init__(a,b,u({error:c}))})}});
t("AttributeError",[S],{__module__:"org.transcrypt.__runtime__",get __init__(){return h(this,function(a,b,c){S.__init__(a,b,u({error:c}))})}});t("py_TypeError",[S],{__module__:"org.transcrypt.__runtime__",get __init__(){return h(this,function(a,b,c){S.__init__(a,b,u({error:c}))})}});var T=t("Warning",[S],{__module__:"org.transcrypt.__runtime__"});t("UserWarning",[T],{__module__:"org.transcrypt.__runtime__"});t("DeprecationWarning",[T],{__module__:"org.transcrypt.__runtime__"});
t("RuntimeWarning",[T],{__module__:"org.transcrypt.__runtime__"});
function ba(a,b,c){if("undefined"==typeof b||null!=b&&b.hasOwnProperty("__kwargtrans__"))b=null;if("undefined"==typeof c||null!=c&&c.hasOwnProperty("__kwargtrans__"))c=!1;if(arguments.length){var d=arguments.length-1;if(arguments[d]&&arguments[d].hasOwnProperty("__kwargtrans__")){d=arguments[d--];for(var f in d)switch(f){case "iterable":a=d[f];break;case "key":b=d[f];break;case "reverse":c=d[f]}}}b?a.sort(function(g,k){if(arguments.length){var m=arguments.length-1;if(arguments[m]&&arguments[m].hasOwnProperty("__kwargtrans__")){m=
arguments[m--];for(var r in m)switch(r){case "a":g=m[r];break;case "b":k=m[r]}}}return b(g)>b(k)?1:-1}):a.sort();c&&a.reverse()}
t("__Terminal__",[q],{__module__:"org.transcrypt.__runtime__",get __init__(){return h(this,function(a){a.buffer="";try{a.element=document.getElementById("__terminal__")}catch(b){a.element=null}a.element&&(a.element.style.overflowX="auto",a.element.style.boxSizing="border-box",a.element.style.padding="5px",a.element.innerHTML="_")})},get print(){return h(this,function(a){var b=" ",c="\n";if(arguments.length){var d=arguments.length-1;if(arguments[d]&&arguments[d].hasOwnProperty("__kwargtrans__")){var f=
arguments[d--],g;for(g in f)switch(g){case "self":a=f[g];break;case "sep":b=f[g];break;case "end":c=f[g]}}var k=O([].slice.apply(arguments).slice(1,d+1))}else k=O();a.buffer="{}{}{}".format(a.buffer,b.join(function(){for(var m=[],r=e.makeIterator(k),l=r.next();!l.done;l=r.next())m.append(A(l.value));return m}()),c).__getslice__(-4096,null,1);a.element?(a.element.innerHTML=a.buffer.py_replace("\n","<br>").py_replace(" ","&nbsp"),a.element.scrollTop=a.element.scrollHeight):console.log(b.join(function(){for(var m=
[],r=e.makeIterator(k),l=r.next();!l.done;l=r.next())m.append(A(l.value));return m}()))})},get input(){return h(this,function(a,b){if(arguments.length){var c=arguments.length-1;if(arguments[c]&&arguments[c].hasOwnProperty("__kwargtrans__")){c=arguments[c--];for(var d in c)switch(d){case "self":a=c[d];break;case "question":b=c[d]}}}a.print("{}".format(b),u({end:""}));d=window.prompt("\n".join(a.buffer.py_split("\n").__getslice__(-8,null,1)));a.print(d);return d})}})();var ra=Math.PI,sa=Math.E,ta=Math.exp,ua=Math.pow,va=Math.sqrt,wa=Math.sin,xa=Math.cos,ya=Math.tan,za=Math.asin,Aa=Math.atan,Ba=Math.atan2,Ca=Math.hypot,Da=Math.sinh,Ea=Math.cosh,Fa=Math.tanh,Ga=Math.asinh,Ha=Math.acosh,Ia=Math.atanh,Ja=Math.floor,Ka=Math.ceil,La=Math.trunc,Ma=isNaN,U={};U.acos=Math.acos;U.acosh=Ha;U.asin=za;U.asinh=Ga;U.atan=Aa;U.atan2=Ba;U.atanh=Ia;U.ceil=Ka;U.cos=xa;U.cosh=Ea;U.degrees=function(a){return 180*a/Math.PI};U.e=sa;U.exp=ta;U.expm1=function(a){return Math.exp(a)-1};
U.floor=Ja;U.hypot=Ca;U.inf=Infinity;U.isnan=Ma;U.log=function(a,b){return void 0===b?Math.log(a):Math.log(a)/Math.log(b)};U.log10=function(a){return Math.log(a)/Math.LN10};U.log1p=function(a){return Math.log(a+1)};U.log2=function(a){return Math.log(a)/Math.LN2};U.modf=function(a){var b=0<=a?1:-1;a=aa(a);a=O([Math.floor(a/1),R(a,1)]);return O([a[1]*b,a[0]*b])};U.nan=NaN;U.pi=ra;U.pow=ua;U.radians=function(a){return a*Math.PI/180};U.sin=wa;U.sinh=Da;U.sqrt=va;U.tan=ya;U.tanh=Fa;U.trunc=La;(function(a,b,c){if(""!=b){b=b.split(".");for(var d=b.length,f=0;f<b.length;f++){if(!a.hasOwnProperty(b[f])){d=f;break}a=a[b[f]]}for(f=d;f<b.length;f++)a[b[f]]={},a=a[b[f]]}b={};d=e.makeIterator(Object.getOwnPropertyNames(c));for(f=d.next();!f.done;b={$jscomp$loop$prop$attrib$24:b.$jscomp$loop$prop$attrib$24},f=d.next())b.$jscomp$loop$prop$attrib$24=f.value,Object.defineProperty(a,b.$jscomp$loop$prop$attrib$24,{get:function(g){return function(){return c[g.$jscomp$loop$prop$attrib$24]}}(b),enumerable:!0,
configurable:!0})})({},"",U);for(var V=[],Na=0;624>Na;Na++)V.append(0);var W=0,Oa=Math.pow(2,32)-1,Pa=Math.pow(2,31),Qa=Math.pow(2,31)-1,X=void 0;if("undefined"==typeof X||null!=X&&X.hasOwnProperty("__kwargtrans__"))X=B(Qa*Math.random());V[0]=X;for(var Y=1;624>Y;Y++)V[Y]=(1812433253*V[Y-1]^(V[Y-1]>>30)+Y)&Oa;var Ra=Q({".":["SoundClips/Dot.mp3","SoundClips/Dot2.mp3","SoundClips/Dot3.mp3","SoundClips/Dot4.mp3","SoundClips/Dot5.mp3"],8:["SoundClips/Eight.mp3","SoundClips/Eight2.mp3","SoundClips/Eight3.mp3"],5:["SoundClips/Five.mp3","SoundClips/Five2.mp3","SoundClips/Five3.mp3"],4:["SoundClips/Four.mp3","SoundClips/Four2.mp3","SoundClips/Four3.mp3"],9:["SoundClips/Nine.mp3","SoundClips/Nine2.mp3","SoundClips/Nine3.mp3"],1:["SoundClips/One.mp3","SoundClips/One2.mp3","SoundClips/One3.mp3"],7:["SoundClips/Seven.mp3",
"SoundClips/Seven2.mp3","SoundClips/Seven3.mp3"],6:["SoundClips/Six.mp3","SoundClips/Six2.mp3","SoundClips/Six3.mp3"],3:["SoundClips/Three.mp3","SoundClips/Three2.mp3","SoundClips/Three3.mp3"],2:["SoundClips/Two.mp3","SoundClips/Two2.mp3","SoundClips/Two3.mp3"],0:["SoundClips/zero.mp3","SoundClips/zero2.mp3","SoundClips/zero3.mp3"]});
function Sa(a,b){var c;return e.asyncExecutePromiseGeneratorProgram(function(d){switch(d.nextAddress){case 1:return d.yield(fetch(a),2);case 2:c=d.yieldResult;if("json"==b)return d.yield(c.json(),7);if("arrayBuffer"!=b){d.jumpTo(0);break}return d.yield(c.arrayBuffer(),6);case 6:return d.return(d.yieldResult);case 7:return d.return(d.yieldResult)}})}
var Z=t("FemboyMoanMyIp",[q],{__module__:"__main__",NOT_PLAYING:0,PLAYING:1,STALLED:2,get __init__(){return h(this,function(a,b){a.sound_sequence_gen=b;a.sound_sequence=H(a.sound_sequence_gen);a.ctx=new AudioContext;a.state=Z.NOT_PLAYING;a.playback_pos=0;a.next_clip=null;a.prefetch(0)})},get prefetch(){return h(this,function(a,b){var c,d,f;return e.asyncExecutePromiseGeneratorProgram(function(g){if(1==g.nextAddress)return c=a.sound_sequence[b],g.yield(Sa(c,"arrayBuffer"),2);if(3!=g.nextAddress)return d=
g.yieldResult,g.yield(a.ctx.decodeAudioData(d),3);f=g.yieldResult;a.on_fetch_complete(f);g.jumpToEnd()})})},get play_clip(){return h(this,function(a,b){var c=a.ctx.createBufferSource();c.buffer=b;c.connect(a.ctx.destination);c.addEventListener("ended",a.play_next_clip);c.start(0)})},get advance(){return h(this,function(a){a.playback_pos++;a.playback_pos<x(a.sound_sequence)?a.prefetch(a.playback_pos):(a.sound_sequence=H(a.sound_sequence_gen),a.playback_pos=0,a.prefetch(0))})},get on_fetch_complete(){return h(this,
function(a,b){a.state==Z.STALLED?(a.state=Z.PLAYING,a.play_clip(b),a.advance()):a.next_clip=b})},get play_next_clip(){return h(this,function(a){0==a.playback_pos&&a.state!=Z.NOT_PLAYING?a.state=Z.NOT_PLAYING:a.next_clip?(a.state=Z.PLAYING,a.play_clip(a.next_clip),a.next_clip=null,a.advance()):a.state=Z.STALLED})},get go(){return h(this,function(a){a.state==Z.NOT_PLAYING&&a.play_next_clip()})}}),Ua=function Ta(a){return e.generator.createGenerator(Ta,function(c){for(var d=c.yield,f=[],g=e.makeIterator(a),
k=g.next();!k.done;k=g.next()){var m=f,r=m.append,l=Ra[k.value];k=l;l=x(l)-1;if(0==W)for(var p=0;624>p;p++){var L=(V[p]&Pa)+(V[R(p+1,624)]&Qa);V[p]=V[R(p+397,624)]^L>>1;0!=R(L,2)&&(V[p]^=2567483615)}p=V[W];p^=p>>11;p^=p<<7&2636928640;p^=p<<15&4022730752;p^=p>>18;W=R(W+1,624);l=0+R(p,l-0+1);r.call(m,k[l])}return d.call(c,f,1)})};
(function(){var a,b,c,d;return e.asyncExecutePromiseGeneratorProgram(function(f){if(1==f.nextAddress)return f.yield(Sa("https://api.bigdatacloud.net/data/client-ip","json"),2);a=f.yieldResult;b=a.ipString;document.getElementById("bind-ip").textContent=b;c=Ua(b);d=Z(c);document.getElementById("bind-button").addEventListener("click",d.go);f.jumpToEnd()})})();}).call(this);