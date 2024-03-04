/** Function Declaration */
function foo(name: string): number {
  return name.length;
}

/** Function Expression */
const fn = function (name: string): number {
  return name.length;
};

/** Arrow Function */
const func = (name: string): number => name.length;
const func2: (name: string) => number = (name) => name.length;

/** void */
function foo2(): void {}
function foo3(): void {
  return;
}
// 使用 void 类型能更好地说明这个函数没有进行返回操作
// 因此 foo3，其实更好的方式是使用 undefined
function foo4(): undefined {
  return;
}

/** 可选和默认值 */
function foo5(name: string, age: number = 18): number {
  const inputAge = age;
  return name.length + inputAge;
}

/** rest 参数 */
function foo6(arg1: string, ...rest: any[]) {}

function foo7(arg1: string, ...rest: [number, boolean]) {}

foo7('tom', 18, true);

/** Overload Signature 获得更精确的类型标注能力 */
// 重载签名一，传入 bar 的值为 true 时，函数返回值为 string 类型
function func3(foo: number, bar: true): string; // 注释这行及下一行，观察 res1，res2，res3 得类型标注
// 重载签名二，不传入 bar，或传入 bar 的值为 false 时，函数返回值为 number 类型
function func3(foo: number, bar?: false): number;
// 函数的实现签名，会包含重载签名的所有可能情况
function func3(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

const res1 = func3(599); // number
const res2 = func3(599, true); // string
const res3 = func3(599, false); // number

/** 异步函数 */
async function asyncFunc(): Promise<void> {}

function* genFunc(): Iterable<void> {}

async function* asyncGenFunc(): AsyncIterable<void> {}

/** Class */
class Foo {
  prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }

  get propA(): string {
    return `${this.prop}+A`;
  }

  // setter 方法不允许进行返回值的类型标注
  // 你可以理解为 setter 的返回值并不会被消费，它是一个只关注过程的函数
  set propA(value: string) {
    this.prop = `${value}+A`;
  }
}

/** 修饰符 public / private / protected / readonly */
// public：此类成员在类、类的实例、子类中都能被访问。
// private：此类成员仅能在类的内部被访问。
// protected：此类成员仅能在类与子类中被访问，你可以将类和类的实例当成两种概念，即一旦实例化完毕（出厂零件），那就和类（工厂）没关系了，即不允许再访问受保护的成员
class Foo2 {
  private prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  protected print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }

  public get propA(): string {
    return `${this.prop}+A`;
  }

  public set propA(value: string) {
    this.propA = `${value}+A`;
  }
}

class Foo3 {
  arg1: string;
  arg2: boolean;
  constructor(arg1: string, arg2: boolean) {
    this.arg1 = arg1;
    this.arg2 = arg2;
  }
}

new Foo3('tom', true);
// 为构造函数入参增加访问性修饰符，可以免去在 constructor 中手动赋值
class Foo4 {
  constructor(public arg1: string, private arg2: boolean) {}
}

new Foo4('tom', true);

/** 静态成员 */
class Foo5 {
  static staticHandler() {}

  public instanceHandler() {}
}
const ins = new Foo5();
// 静态成员直接被挂载在函数体上
Foo5.staticHandler;
// 而实例成员挂载在原型上
Foo5.prototype.instanceHandler;

/** 继承 */
class Base {}
class Derived extends Base {}

/** override 覆写，该关键字来确保派生类尝试覆盖的方法一定在基类中存在定义 */
class Base2 {
  // print() {}
  printWithLove() {}
}

class Derived2 extends Base2 {
  override print() {
    // ...
  }
}

/** abstract 抽象类，它的本质就是描述类的结构 */
abstract class AbsFoo {
  abstract absProp: string;
  abstract get absGetter(): string;
  abstract absMethod(name: string): string;
}
// 必须完全实现这个抽象类的每一个抽象成员
class Foo6 implements AbsFoo {
  absProp: string = 'tom';

  get absGetter() {
    return 'tom';
  }

  absMethod(name: string) {
    return name;
  }
}

// 也可以用 interface，描述类结构
interface FooStruct {
  absProp: string;
  get absGetter(): string;
  absMethod(input: string): string;
}

class Foo7 implements FooStruct {
  absProp: string = 'jerry';

  get absGetter() {
    return 'jerry';
  }

  absMethod(name: string) {
    return name;
  }
}

// 私有构造函数，会得到一个不能实例化的类
class Utils {
  private constructor() {}
}
