import { TiagoTeamTask } from '@byted-creative/tiago/lib/services/team';
import { PlayerInfo, TiagoConfig } from '@byted-creative/tiago/lib/interfaces';

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