import { PlayerInfo, Config } from '@byted-creative/tiago/dist/interface';

/**
 * 存储tiago相关数据
 *
 * @class TiagoModel
 */
class TiagoModel{

  selfUserInfo!: PlayerInfo;

  twoPlayersInfo!: PlayerInfo;
  
  config!: Config;

  
  environment: any = "";
}
export const tiagoModel = new TiagoModel();