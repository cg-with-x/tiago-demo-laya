import { TiagoTeamTask } from '@byted-creative/tiago/lib/src/services/team';
import { TiagoConfig, PlayerInfo } from '@byted-creative/tiago/lib/src/interfaces';

/**
 * 存储tiago相关数据
 *
 * @class TiagoModel
 */
class TiagoModel{

  selfUserInfo!: PlayerInfo;
 
  config!: TiagoConfig; 

  currentTeam?: TiagoTeamTask;

}
export const tiagoModel = new TiagoModel();