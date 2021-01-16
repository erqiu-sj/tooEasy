/*
 * @Author: 邱狮杰
 * @Date: 2021-01-16 09:42:40
 * @LastEditTime: 2021-01-16 13:08:48
 * @FilePath: /tooSimple/src/core/provider.ts
 * @Description:装饰器
 */

import { classDecoratorType, Props } from "./generic";
import { reinitialize } from "./scheduler";
import { CLASSKEY, INJECT } from "../constant";
import "reflect-metadata";
/**
 * @example Provider('name',[awesome],false)
 * @description 装饰器的方式创建一个容器
 * @param naming 容器名
 * @param args 容器参数
 * @param initialize 中央状态管理是否初始化
 * @returns { void }
 */
export function Provider<T>(
  naming: unknown,
  args?: ArrayLike<T>,
  initialize?: boolean
): (target: classDecoratorType) => void {
  const centralAuthorities = reinitialize(initialize);
  return function (target: classDecoratorType): classDecoratorType {
    centralAuthorities?.bind(naming, target, args);
    Reflect.defineMetadata(
      CLASSKEY,
      {
        className: target,
        params: args || [],
      },
      target
    );
    return target;
  };
}
/**
 * @example Injection()
 * @description 注入依赖
 * @return { (target: any, key: string) => void }
 */
export function Injection(): (target: any, key: string) => void {
  return function (target: any, key: string): void {
    const whoNeedsTt = target.constructor;
    let props: Props = {};
    // 判断是否有这个依赖，有则获取
    if (Reflect.hasMetadata(INJECT, whoNeedsTt))
      props = Reflect.getMetadata(INJECT, whoNeedsTt);
    // 给该类新增依赖
    props[key] = {
      value: key,
    };
    // 赋值
    Reflect.defineMetadata(INJECT, props, whoNeedsTt);
  };
}
