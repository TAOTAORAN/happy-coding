/**
 * 构造函数继承
 */
function Cat(name: string, color: string) {
  this.name = name;
  this.color = color;
}

function Animal() {
  this.behavior = 'eat';
}

// 方式一：构造函数继承
// function Cat(name: string, color: string) {
//   Animal.apply(this, arguments)
//   this.name = name;
//   this.color = color;
// }

// 方式二：prototype 模式
// 执行后 Cat.prototype.constructor == Animal
Cat.prototype = new Animal();
// 恢复 constructor 的指向
Cat.prototype.constructor = Cat;

// 方式三：直接继承 prototype
// 改写 Animal
// function Animal () {}
// Animal.prototype.behavior = 'eat';
Cat.prototype = Animal.prototype; // 任何 Cat.prototype 的修改都会影响 Animal.prototype
Cat.prototype.constructor = Cat; // 也改动了 Animal.prototype.constructor

// 方式四：利用空对象作为中介
const F = function () {};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;

// 方式五：拷贝继承 把父对象的所有属性和方法拷贝给子对象

/**
 * 对象继承
 */
// 方式一
function inherit(parentObj) {
  const F = function () {};
  F.prototype = parentObj;
  return new F();
}

// 方式二：对象浅拷贝/深拷贝

// 实现 寄生组合式继承/extends
function myExtends(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

function Parent(name) {
  this.name = name;
}
Parent.prototype.getName = function () {
  return this.name;
};

function Child(age) {
  Parent.apply(this, arguments);
  this.age = age;
}

myExtends(Child, Parent);

Child.prototype.getAge = function () {
  return this.age;
};
