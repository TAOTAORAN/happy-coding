/** type 关键字, 主要是对一组类型或一个特定类型结构进行封装，以便于在其它地方进行复用 */
// 抽离联合类型：
type StatusCode = 200 | 301 | 400 | 500 | 502;
type PossibleDataTypes = string | number | (() => unknown);

const status: StatusCode = 502;

// 抽离函数类型：
type Handler = (e: Event) => void;

const clickHandler: Handler = (e) => {};
const moveHandler: Handler = (e) => {};
const dragHandler: Handler = (e) => {};

// 声明一个对象类型：
type ObjType = {
  name: string;
  age: number;
};

/** 工具类型： 基于类型别名，并多了个泛型 */
// 工具类型就像一个函数一样，泛型T是入参，内部逻辑基于入参进行某些操作，再返回一个新的类型
type Factory<T> = T | number | string;

// 泛型参数的名称（上面的 T ）也不是固定的。通常我们使用大写的 T / K / U / V / M / O ...这种形式。
// 如果为了可读性考虑，我们也可以写成大驼峰形式（即在驼峰命名的基础上，首字母也大写）的名称，比如：
type Factory2<NewType> = NewType | number | string;

// 常见用法1：
type MaybeNull<T> = T | null;

function process(input: MaybeNull<{ handler: () => {} }>) {
  input?.handler();
}

// 常见用法2:
type MaybeArray<T> = T | T[];

function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}

/** 联合类型 | 和 交叉类型 & */
interface NameStruct {
  name: string;
}

interface AgeStruct {
  age: number;
}

type ProfileStruct = NameStruct & AgeStruct;

const profile: ProfileStruct = {
  name: 'tom',
  age: 18,
};

// 被认为是 never 类型：不存在既是 string 又是 number 的类型
// 实际上，这也是 never 的实际意义之一：描述根本不存在的类型
type StrAndNum = string & number;

// 内部的同名属性类型同样会按照交叉类型进行合并
type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
};

type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  };
};

type Composed = Struct1 & Struct2;

type PrimitivePropType = Composed['primitiveProp']; // never
type ObjectPropType = Composed['objectProp']; // { name: string; age: number; }

// 交叉类型和联合类型的区别就是，联合类型只需要符合成员之一即可，而交叉类型需要严格符合每一位成员
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string; // string

/** 索引类型： 索引签名类型、索引类型查询、索引类型访问 */
/** 索引签名类型： 快速声明一个键值类型一致的类型结构 */
type AllStringTypes1 = {
  [key: string]: string;
};

interface AllStringTypes2 {
  [key: string]: string;
}

type PropType1 = AllStringTypes2['tom']; // string
type PropType2 = AllStringTypes2['599']; // string

// JavaScript 中， obj[599] 和 obj['599'] 的效果是一致的
// 因此，在字符串索引签名类型中我们仍然可以声明数字类型的键
const foo: AllStringTypes2 = {
  age: '599',
  599: 'tom',
  [Symbol('ddd')]: 'symbol',
};

// 常见实用场景：对于未知的对象键值类型，可以使用这种方式，暂时支持对类型未明确属性的访问，并在后续可以补全
interface AnyTypeHere {
  [key: string]: any;
}

const name: AnyTypeHere['name'] = 'any value';

/** keyof 索引类型查询：它可以将对象中的所有键转换为对应的字面量，再组合成联合类型。因此 keyof 的产物为 联合类型 */
interface Foo {
  age: 1;
  599: 2;
}

// type FooKeys = keyof Foo; // "age" | 599
// 在 VS Code 中悬浮鼠标只能看到 'keyof Foo'
// 看不到其中的实际值，你可以这么做：
type FooKeys = keyof Foo & {}; // "age" | 599

// keyof 等价于
// type FooKeys = Object.keys(Foo).join(" | ");

/** 索引类型访问：以通过 obj[类型] 的方式来动态访问一个对象属性 */
interface Foo2 {
  propA: number;
  propB: boolean;
}

type PropAType = Foo2['propA']; // number
type PropBType = Foo2['propB']; // boolean

/** 映射类型，联想 JS 中的 map方法，更好理解 */
type Stringify<T> = {
  [K in keyof T]: string;
};

interface Foo3 {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type StringifiedFoo1 = Stringify<Foo3>;

// 等价于
interface StringifiedFoo2 {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
}
