var a = require('./a');
a.sayHello();

var b = require('./b');

b.sayHello();
console.log('hello main2');

var _ = require('lodash');
console.log('NaN', _.isNaN(NaN));

var $ = require('jquery');
console.log('$', $('body'));
