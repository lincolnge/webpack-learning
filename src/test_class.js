console.warn('hello class!');
const storeLog = console.log;

console.log = console.assert;
console.warn = console.assert;
console.error = console.assert;

//定义类
const bar = Symbol('bar');
const snaf = Symbol('snaf');

class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.foo = (baz) => {
      this[bar](baz);
      return this[snaf];
    }
    this[bar] = (baz) => {
      return this[snaf] = baz;
    }
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

  // // 公有方法
  // foo (baz) {
  //   this[bar](baz);
  //   return this[snaf];
  // }
  //
  // // 私有方法
  // [bar](baz) {
  //   return this[snaf] = baz;
  // }

}

// function bar(baz) {
//   console.log('xxx', baz);
//   return this.snaf = baz;
// }

const px = new Point();
const { foo } = px;
// console.log('baz', px.foo(123));
console.log('baz', foo(444));

var point = new Point(2, 3);

// console.log(point.toString()) // (2, 3)

var p1 = new Point(2,3);
var p2 = new Point(3,2);

// console.log('xxx p1.__proto__ === p2.__proto__', p1.__proto__ === p2.__proto__);

const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};

// console.log('MyClass xx', new MyClass().getClassName());

let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    // console.log(this.name);
  }
}('张三');
person.sayName()
// console.log('person person');

p1.__proto__.printName = function () { return 'Oops' };

// console.log(p1.printName()) // "Oops"
// console.log(p2.printName()) // "Oops"

var p3 = new Point(4,2);
// console.log(p3.printName()) // "Oops"

// console.log(point.hasOwnProperty('x')) // true
// console.log(point.hasOwnProperty('y')) // true
// console.log(point.hasOwnProperty('toString')) // false
// console.log(point.__proto__.hasOwnProperty('toString')) // true

console.error('end class!');
console.log = storeLog;
