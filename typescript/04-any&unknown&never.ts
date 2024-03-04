/** any 任意类型 */

// any
let foo;

// foo、bar 均为 any
function func(foo, bar) {}
// 以上的函数声明在 tsconfig 中启用了 noImplicitAny 时会报错

/** unknown */
// 一个 unknown 类型的变量只能赋值给 any 与 unknown 类型的变量
let unknownVar: unknown = 'tom';

unknownVar = false;
unknownVar = 'tom';
unknownVar = {
  site: 'tom',
};

unknownVar = () => {};

const val1: string = unknownVar; // Error
const val2: number = unknownVar; // Error
const val3: () => {} = unknownVar; // Error
const val4: {} = unknownVar; // Error

const val5: any = unknownVar;
const val6: unknown = unknownVar;

/** never 只有 never 类型的变量能够赋值给另一个 never 类型变量 */
// 使用场景：
declare const strOrNumOrBool: string | number | boolean | Function;

if (typeof strOrNumOrBool === 'string') {
  console.log('str!');
} else if (typeof strOrNumOrBool === 'number') {
  console.log('num!');
} else if (typeof strOrNumOrBool === 'boolean') {
  console.log('bool!');
} else {
  const _exhaustiveCheck: never = strOrNumOrBool;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}
// 启用了 strictNullChecks 配置，同时禁用了 noImplicitAny 配置时会报错
const arr = [];

arr.push('tom'); // 类型“string”的参数不能赋给类型“never”的参数。

/** as 类型断言 应当是在迫不得己的情况下使用的*/
interface IFoo {
  name: string;
}

declare const obj: {
  foo2: IFoo;
};

const { foo2 = {} as IFoo } = obj;

/** 双重断言 */
const str: string = 'tom';
// 因为你的断言类型和原类型的差异太大，需要先断言到一个通用的类，即 any / unknown。
// 这一通用类型包含了所有可能的类型，因此断言到它和从它断言到另一个类型差异不大
// (str as { handler: () => {} }).handler()
(str as unknown as { handler: () => {} }).handler();
// 使用尖括号断言
(<{ handler: () => {} }>(<unknown>str)).handler();

/** 非空断言 */
declare const foo3: {
  func?: () => {
    prop?: number | null;
  };
};
// func 在 foo 中不一定存在，prop 在 func 调用结果中不一定存在，且可能为 null，我们就会收获两个类型报错
foo3.func().prop.toFixed();
// 如果不管三七二十一地坚持调用，想要解决掉类型报错就可以使用非空断言
// foo3.func!().prop!.toFixed();

// 非空断言是类型断言的简写，代码等价于
(
  (
    foo3.func as () => {
      prop?: number;
    }
  )().prop as number
).toFixed();

// 类型断言还有一种用法是作为代码提示的辅助工具，比如对于以下这个稍微复杂的接口
interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}
// 使用类型标注，会报错。因为必须实现整个接口结构才可以
// const object: IStruct = {};

// 使用类型断言，可以在保留类型提示的前提下，不那么完整地实现这个结构
const object = <IStruct>{
  bar: {
    baz: {},
  },
};
