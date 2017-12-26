var $ = require('jquery');
console.log('$', $('body'));


@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

console.log('MyTestableClass.isTestable', MyTestableClass.isTestable); // true


module.exports = {
    sayHello: function(){
        console.log('common a 123!');
    }
};
