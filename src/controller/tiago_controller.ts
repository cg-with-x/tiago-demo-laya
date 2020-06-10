import tiago from '@byted-creative/tiago';
import { tiagoModel } from '~/model/tiago_model';
import { roomController } from './room_controller';

class TiagoController{
  tiagoInited: boolean = false;
  /**
   * 初始化Tiago
   *
   * @memberof TiagoController
   */
  async init(){
    try {
      await tiago.init({
        appId: 'tt5e982825c1b2d9a3',
        debug: true,
      })

      this.tiagoInited = true;
      console.log('tiago init success.');

    } catch(err){
      console.log(err);
      // NOTE: 一般情况不会出错，我们会对错误情况做监控，游戏可以处理一些异常情况下的表现
    }
    
  }

  getConfig(){
    if (!this.tiagoInited) return;
    tiagoModel.config = tiago.getConfig();
    console.log('tiagoModel.config', tiagoModel.config);

    // 根据场景值可以拿到各个场景的参数
    if (tiagoModel.config.currentScene === tiago.BUSINESS_SCENE.LiveRoom) {
      // 当前是直播场景
      const params = tiagoModel.config.scene[tiagoModel.config.currentScene]

      if (params && params.isNewcomer) {  
          // NOTE: 补充新手逻辑
          console.log('新手首次加入游戏');
      }
      
      // NOTE: 针对直播场景，调整使用直播专用的 UI，或处理其他特殊逻辑
    } else if (tiagoModel.config.currentScene === tiago.BUSINESS_SCENE.Wonderland) {
        // 当前是 W 场景
    }
  }

  getUserInfo(){
    if (!this.tiagoInited) return;

    const info = tiago.getUserInfo();
    console.log(info);

    // NOTE: 这里只是简单的保存下来
    tiagoModel.selfUserInfo = info;
    // this.renderSelf(dataManager.selfUserInfo);
  }
  

  startSingleMatch(needAI: boolean){
    const match = tiago.startSingleMatch({
      isAutoAppendAI: needAI, // 支持 AI 逻辑
    });
    // TODO 字符串变为枚举类型，并且需要根据对应类型，定义result类型。
    match.on('match-success', result => {
      // 获得匹配成功后的用户信息
      console.log(result);
    });
    
    match.on('create-game-room-success', result => {
      console.log(result);

      // NOTE: 随后可以加入游戏房间
      const room = tiago.joinGameRoom({
          roomNum: result.roomNum,
      });


      // 交由 room_manager 进行管理
      roomController.loadRoom(room);
    });
    
    match.on('error', error => {
      console.log(error);
    });
  }

  

}
export const tiagoController = new TiagoController();