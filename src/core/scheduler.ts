/*
 * @Author: 邱狮杰
 * @Date: 2021-01-16 09:52:55
 * @LastEditTime: 2021-01-16 10:09:59
 * @FilePath: /fastReq/src/core/scheduler.ts
 * @Description: 调度器
 */
let centralAdministration: null | Possessor = null;
import { Possessor } from "./index";
/**
 * @example Reinitialize(true)
 * @description 是否重新初始化中央状态管理器
 * @param { boolean } state 该值取决于中央状态管理器是否唯一
 * @return { null | Possessor }
 */
export function reinitialize(state?: boolean): null | Possessor {
  if (state) {
    // 重新初始化 并返回初始化后的值
    centralAdministration = new Possessor();
    return centralAdministration;
  }
  if (isInitialized()) return centralAdministration;
  centralAdministration = new Possessor();
  return centralAdministration;
}
/**
 * @example isInitialized()
 * @description 判断是否已经初始化
 * @global centralAdministration 作用全局
 * @return { boolean }
 */
function isInitialized(): boolean {
  if (centralAdministration) return true;
  return false;
}
