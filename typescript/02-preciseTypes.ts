interface IRes {
  code: number;
  status: string;
  data: any;
}

/** 字面量类型（Literal Types） */
const str: 'tom' = 'tom';
const num: 599 = 599;
const bool: true = true;

// 可以更精确描述 Res，字面量类型 + 联合类型
interface Res {
  code: 10000 | 10001 | 50000;
  status: 'success' | 'failure';
  data: any;
}

// 类型别名 + 联合类型
type Code = 10000 | 10001 | 50000;
type Status = 'success' | 'failure';

// 对象字面量类型 意味着这个对象的值全都为字面量值
interface Tmp {
  obj: {
    name: 'tom';
    age: 18;
  };
}

const tmp: Tmp = {
  obj: {
    name: 'tom',
    age: 18,
  },
};

/** 枚举 */
enum PageUrl {
  Home_Page_Url = 'url1',
  Setting_Page_Url = 'url2',
  Share_Page_Url = 'url3',
}

const home = PageUrl.Home_Page_Url;

// 在这个例子中，Items.Foo , Items.Bar , Items.Baz的值依次是 0，1，2
enum Items {
  Foo,
  Bar,
  Baz,
}

enum Items2 {
  // 0
  Foo,
  Bar = 599,
  // 600
  Baz,
}

// 仅有值为数字的枚举成员才能够进行这样的双向枚举：可以拿到 key 和 value
const fooValue = Items.Foo; // 0
const fooKey = Items[0]; // "Foo"

/** 常量枚举 */
const enum Items3 {
  Foo,
  Bar,
  Baz,
}

const foo = Items3.Foo; // 0
