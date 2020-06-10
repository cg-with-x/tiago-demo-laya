import { roomController } from '~/controller/room_controller';

export default class GameScene extends Laya.Scene {
  constructor(){
    super();
    this.url = "game_scene.json"
  }
  // region ========================================  Laya UI组件  ========================================
  serverTime!: Laya.Label;
  attackBtn!: Laya.Button;
  endRoomBtn!: Laya.Button;
  reconnectBtn!: Laya.Button;
  // endregion
  // region ========================================  自定义参数  ========================================
  // endregion
  // region ========================================  Laya 生命周期  ========================================
  onAwake(){
    super.onAwake();
  }

  onEnable(){
    super.onEnable();
    if (roomController.room) {
      roomController.room.send(JSON.stringify({
        event: 'ready',
      }));
    }
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
export const gameScene = new GameScene()