import { PlayerInfo, Config } from '@byted-creative/tiago/dist/interface';
import { TiagoTeamTask } from '@byted-creative/tiago/lib/services/team';

/**
 * 存储tiago相关数据
 *
 * @class TiagoModel
 */
class TiagoModel{

  selfUserInfo!: PlayerInfo;
 
  config!: Config; 

  currentTeam?: TiagoTeamTask;

}
export const tiagoModel = new TiagoModel();