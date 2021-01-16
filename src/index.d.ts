/*
 * @Author: 邱狮杰
 * @Date: 2021-01-16 12:57:47
 * @LastEditTime: 2021-01-16 13:10:45
 * @FilePath: /tooSimple/src/index.d.ts
 * @Description: tooEasy 太简单啦
 */
import { classDecoratorType } from "./core/generic";
import { Possessor } from "./core";

export function Provider<T>(
  naming: unknown,
  args?: ArrayLike<T>,
  initialize?: boolean
): (target: classDecoratorType) => void;
export function Injection(): (target: any, key: string) => void;
export function reinitialize(state?: boolean): null | Possessor;
