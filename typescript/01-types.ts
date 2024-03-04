const name1: string = 'tom';
const age: number = 24;
const male: boolean = false;
const undef: undefined = undefined;
const nul: null = null;
const obj: object = { age, male };
const bigintVar1: bigint = 9007199254740991n;
const bigintVar2: bigint = BigInt(9007199254740991);
const symbolVar: symbol = Symbol('unique');

/** null 和 undefined */
const tmp1: null = null;
const tmp2: undefined = undefined;

const tmp3: string = null; // 仅在关闭 strictNullChecks 时成立，下同
const tmp4: string = undefined;

/** void */
void (function iife() {
  console.log('Invoked!');
})();
// 等价于
void (function () {})();

// 表示空类型，可以被 undefined 赋值
const voidVar1: void = undefined;

const voidVar2: void = null; // 需要关闭 strictNullChecks

/** 数组 */
const arr1: string[] = [];
// 两种写法等价，第一种更常见
const arr2: Array<string> = [];

// 限制数组长度
const arr4: [string, string, string] = ['tom', 'tom', 'tom'];
console.log(arr4[599]);

// 限制数组长度 小于
const arr6: [string, string?, string?] = ['tom'];
// 可以更语义化如下
const arr7: [name: string, age: number, male?: boolean] = ['tom', 599, true];
// readonly 将让数组不再具有 push、pop 等修改原数组的方法
const arr8: readonly string[] = [];
arr8.push();

/** 对象 */
// 可选
interface IDescription {
  name: string;
  age: number;
  male?: boolean;
  func?: Function;
}

const obj2: IDescription = {
  name: 'jerry',
  age: 599,
  male: true,
  // 无需实现 func 也是合法的
};

/** readonly */
interface IDescription2 {
  readonly country: string;
  age: number;
}

const obj3: IDescription2 = {
  country: 'China',
  age: 599,
};

// 无法分配到 "name" ，因为它是只读属性
obj3.country = '林不渡';

/** interface & type */
// interface 用来描述对象、类的结构
// 类型别名用来将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型

/** object & Object & {} */
// 原型链的顶端是 Object 以及 Function，这也就意味着所有的原始类型与对象类型最终都指向 Object
// 在 TypeScript 中就表现为 Object 包含了所有的类型
// 对于 undefined、null、void 0 ，需要关闭 strictNullChecks
const test1: Object = undefined;
const test2: Object = null;
const test3: Object = void 0;

const test4: Object = 'linbudu';
const test5: Object = 599;
const test6: Object = { name: 'linbudu' };
const test7: Object = () => {};
const test8: Object = [];

// 和 Object 类似的还有 Boolean、Number、String、Symbol
// 以 String 为例，它同样包括 undefined、null、void，以及代表的 拆箱类型（Unboxed Types） string
const test9: String = undefined;
const test10: String = null;
const test11: String = void 0;
const test12: String = 'tom';

// 以下不成立，因为不是字符串类型的拆箱类型
const test13: String = 599; // X
const test14: String = { name: 'tom' }; // X
const test15: String = () => {}; // X
const test16: String = []; // X

// ！important：在任何情况下，你都不应该使用这些装箱类型
// object 的引入就是为了解决对 Object 类型的错误使用，它代表所有非原始类型的类型，即数组、对象与函数类型这些
const test17: object = undefined;
const test18: object = null;
const test19: object = void 0;

const test20: object = 'tom'; // X 不成立，值为原始类型
const test21: object = 599; // X 不成立，值为原始类型

const tmp22: object = { name: 'jerry' };
const tmp23: object = () => {};
const tmp24: object = [];

// {}
const tmp25: {} = undefined; // 仅在关闭 strictNullChecks 时成立，下同
const tmp26: {} = null;
const tmp27: {} = void 0; // void 0 等价于 undefined

const tmp28: {} = 'tom';
const tmp29: {} = 599;
const tmp30: {} = { name: 'tom' };
const tmp31: {} = () => {};
const tmp32: {} = [];
// 无法对这个变量进行任何赋值操作
tmp30.age = 'tom';
