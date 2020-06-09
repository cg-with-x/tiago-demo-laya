import { PlayerInfo } from "../../node_modules/@byted-creative/tiago/dist/interface";

/**
 * 存储tiago相关数据
 *
 * @class TiagoModel
 */
class TiagoModel{
  tiagoInited: boolean = false;

  selfUserInfo?: PlayerInfo;

  twoPlayersInfo?: PlayerInfo;
  
  environment: any = "";
}
export const tiagoModel = new TiagoModel();