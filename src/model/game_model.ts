import { PlayerInfo } from '@byted-creative/tiago/lib/src/interfaces';

/**
 * 游戏相关数据
 *
 * @class GameModel
 */
class GameModel{

  twoPlayersInfo!: PlayerInfo[];
  
  environment = "";

  serverTime = "";
}
export const gameModel = new GameModel();