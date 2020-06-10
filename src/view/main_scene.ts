import { tiagoController } from '~/controller/tiago_controller';
import tiago from '@byted-creative/tiago';
import { tiagoModel } from '~/model/tiago_model';
import { roomController } from '~/controller/room_controller';


export default class MainScene extends Laya.Scene {
  constructor(){
    super();
    this.url = "main_scene.json"
  }
  // region ========================================  Laya UI组件  ========================================
  // 按钮: 获取配置信息
  getConfigBtn!: Laya.Button;
  // 按钮: 获取用户信息
  getUserInfoBtn!: Laya.Button;
  // 按钮: 1v1 匹配
  matchBtn!: Laya.Button;
  // 按钮: 1v1 匹配 (带AI)
  matchWithAIBtn!: Laya.Button;
  // endregion
  // region ========================================  自定义参数  ========================================
  // endregion
  // region ========================================  Laya 生命周期  ========================================
  onAwake(){
    super.onAwake();
    // 初始化tiago
    tiagoController.init();

    this.getConfigBtn.on(Laya.Event.CLICK, this, this.onClickGetConfig);
    this.getUserInfoBtn.on(Laya.Event.CLICK, this, this.onClickGetUserInfo)
    
  }

  onClickGetConfig(){

    if (tiagoModel.config?.currentScene === tiago.BUSINESS_SCENE.LiveRoom) {
        // 当前是直播场景
        const params = tiagoModel.config?.scene[tiagoModel.config?.currentScene]

        if (params?.isNewcomer) {  
            // NOTE: 补充新手逻辑
            console.log('新手首次加入游戏');
        }
        
        // NOTE: 针对直播场景，调整使用直播专用的 UI，或处理其他特殊逻辑
    } else if (tiagoModel.config?.currentScene === tiago.BUSINESS_SCENE.Wonderland) {
        // 当前是 W 场景
    }
  }


  onClickGetUserInfo(){
    const info = tiago.getUserInfo();
    console.log(info);

    // NOTE: 这里只是简单的保存下来
    tiagoModel.selfUserInfo = info;
    // this.renderSelf(dataManager.selfUserInfo);
  }

  onClickStartSingleMatch() {
    const match = tiago.startSingleMatch();

    match.on('match-success', result => {
        // 获得匹配成功后的用户信息
        console.log(result);
    });
    
    match.on('create-game-room-success', (result) => {
        console.log(result);

        // NOTE: 随后可以加入游戏房间
        const room = tiago.joinGameRoom({
            roomNum: result.roomNum,
        });
        
        // NOTE: 加入房间连麦
        // tiago.joinRTCForGameRoom(room);

        // 交由 room_manager 进行管理
        roomController.loadRoom(room);
    });
    
    match.on('error', error => {
        console.log(error);
    });
  }
  onClickStartSingleMatchAI() {
    const match = tiago.startSingleMatch({
      isAutoAppendAI: true, // 支持 AI 逻辑
    });

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
  
  // endregion
  // region ========================================  自定义方法  ========================================
  /**
   * 在代码中初始化 Laya 文件模式场景 json, 方便阅读
   * 如果使用 内嵌模式 ，则直接继承具体场景类即可
   * @param {*} [params]
   * @param {boolean} [closeOther]
   * @param {*} [onOpenedParam]
   * @memberof MainScene
   */
  public loadOpen(params?: any, closeOther?: boolean, onOpenedParam?: any) {
    Laya.loader.load(
      this.url,
      Laya.Handler.create(this, ()=>{
        this.loadScene(this.url);
        this.open(closeOther, onOpenedParam);
      })
    );
  }
  // endregion
}

// 全局单例，如果需要管理，可以设置管理类，来管理所有场景
export const mainScene = new MainScene()