import { PlayerInfo, Config } from '@byted-creative/tiago/dist/interface';
import { Room } from '@byted-creative/pvp-client/build/game_room/room';

/**
 * 存储tiago相关数据
 *
 * @class TiagoModel
 */
class TiagoModel{

  selfUserInfo!: PlayerInfo;

  twoPlayersInfo!: PlayerInfo;
  
  config!: Config;

  room?: Room;
  
  environment: any = "";
}
export const tiagoModel = new TiagoModel();