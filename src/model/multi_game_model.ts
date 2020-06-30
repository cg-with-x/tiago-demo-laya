import { PlayerInfo } from '@byted-creative/tiago/dist/interface';

/**
 * 游戏相关数据
 *
 * @class GameModel
 */
class MultiGameModel{

  multiPlayersInfo!: PlayerInfo[];
  
  environment = "";

  serverTime = "";
}
export const multiGameModel = new MultiGameModel();