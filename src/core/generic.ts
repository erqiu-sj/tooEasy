/*
 * @Author: 邱狮杰
 * @Date: 2021-01-16 09:44:52
 * @LastEditTime: 2021-01-16 11:14:43
 * @FilePath: /fastReq/src/core/generic.ts
 * @Description: 通用类型
 */
/**
 * @description 类装饰器类型
 */
export type classDecoratorType = { new (...args: any[]): {} };
/**
 * @description 注入对象
 */
export interface Props {
  [key: string]: any;
  value?: string;
}
