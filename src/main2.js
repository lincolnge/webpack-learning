var a = require('./lib/a');
a.sayHello();

var b = require('./lib/b');

b.sayHello();
console.log('hello main2');

var _ = require('lodash');
console.log('NaN', _.isNaN(NaN));

var $ = require('jquery');
console.log('$', $('body'));

// 测试 Decorator
// http://es6.ruanyifeng.com/#docs/decorator

function testable(target) {
  target.isTestable = true;
}

@testable
class MyTestableClass {}

console.log('MyTestableClass.isTestable', MyTestableClass.isTestable) // true

/*
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
*/
