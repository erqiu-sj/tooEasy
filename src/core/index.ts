/*
 * @Author: 邱狮杰
 * @Date: 2021-01-16 09:21:09
 * @LastEditTime: 2021-01-16 13:32:18
 * @FilePath: /tooSimple/src/core/index.ts
 * @Description: core
 */
import { classDecoratorType, Props } from "./generic";
import { INJECT } from "../constant/index";
/**
 * @example new Possessor()
 * @function bind() 注册一个子容器
 * @function obtain() 实例化一个容器
 */
export class Possessor {
  private container = new Map<
    any,
    {
      initializeInstance: Function | classDecoratorType;
      parameter: ArrayLike<any> | [];
    }
  >();
  /**
   *
   * @example new Possessor().bind('name',class,[ars])
   * @description 注册一个子容器
   * @param { unknown } naming 容器名
   * @param { Function } initialization 子容器
   * @param { ArrayLike<T> } args 容器参数
   * @return { void }
   */
  bind<T>(
    naming: unknown,
    initialization: Function,
    args?: ArrayLike<T>
  ): void {
    this.container.set(naming, {
      initializeInstance: initialization,
      parameter: args || [],
    });
  }
  /**
   * @example new Possessor().obtain('name')
   * @description 实例化一个容器
   * @param { unknown } naming 容器名
   * @return { any } 如果在容器内找到该值，即返回该实例化后的容器
   */
  obtain(naming: unknown): any {
    if (!this.exists(naming))
      throw new SyntaxError(
        `在容器内找不到${naming},请检查是否使用Provider('${naming}')`
      );
    const target = this.container.get(naming);
    const props: Props = Reflect.getMetadata(
      INJECT,
      target!.initializeInstance
    );
    const afterInstance = Reflect.construct(
      target!.initializeInstance,
      target!.parameter
    );
    for (const propsKey in props) {
      // 注入依赖对象
      afterInstance[propsKey] = this.obtain(props[propsKey].value);
    }
    return afterInstance;
  }
  /**
   * @example exists('name')
   * @description 是否已存在该容器
   * @returns { boolean }
   */
  private exists(naming: unknown): boolean {
    return this.container.has(naming);
  }
}
