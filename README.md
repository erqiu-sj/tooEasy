# tooEasy

> 为什么会有这个包，因为我也被极度耦合的代码折磨过，该源码十分简单，但是功能十分强大，如果你有新的想法也可以提一个 `Pr`

### 该包导出两个装饰器，一个方法

- `reinitialize`

```javascript
// 这是它的函数签名，他负责创建一个容器
// 当state=true时，会返回一个新的容器，为false时会返回维护的容器，该容器负责管理所有状态和依赖
export function reinitialize(state?: boolean): null | Possessor;
```

```javascript
console.log(reinitialize() === reinitialize()); // true
console.log(reinitialize() === reinitialize(true)); // false
//  该函数有两个方法

/**
 * @example new Possessor().bind('name',class,[ars])
 * @description 注册一个子容器
 * @param { unknown } naming 容器名 必填
 * @param { Function } initialization 子容器 必填
 * @param { ArrayLike<T> } args 容器参数 可选
 * @return { void }
 */
reinitialize().bind<T>();

/**
 * @example new Possessor().obtain('name')
 * @description 实例化一个容器
 * @param { unknown } naming 容器名
 * @return { any } 如果在容器内找到该值，即返回该实例化后的容器
 */
 reinitialize().obtain();


// 以下两个装饰器就是基于此实现，你也可以实现一个自己的
```

- `Provider`

```javascript
// 这是她的函数签名
export function Provider<T>(
  naming: unknown, // 容器名
  args?: ArrayLike<T>, //  参数，你可以填入各式各样的参数，必须用[]包裹，但不用担心，你的参数不会变为数组，我会帮你处理
  initialize?: boolean // 是否重新初始化，这在后面会讲到，一般用的较少
): (target: classDecoratorType) => void
```

```javascript
// 一般用它来初始化一个类,用于后面的依赖注入，后两个参数并不是必填
@Provider("a", [], false | true)
class A {}
```

- `Injection`

```javascript
//  这是它的函数签名，显然这是一个参数装饰器
export function Injection(): (target: any, key: string) => void;
```

```javascript
// 创建一个子容器，命名为a，并实例化这个类，推入维护的容器
@Provider("a")
class A {
  // 该装饰器不需要参数，他说根据该属性的key，找到已注册的实例并赋值
  // 如果没找到实例则会报错
  @Injection()
  b?:B
}
// 同上，但在实例化时会将参数带上
@Provider("b",[10])
class B {
  c: number
  constructor(p:number) {
    this.c = p
  }
}
// 此时容器里有a,b两个子容器
// 现在已经实现了解耦
console.log(reinitialize().obtain('a').b.c) // 10
```
