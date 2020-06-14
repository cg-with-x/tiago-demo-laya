import { roomController } from '~/controller/room_controller';
import { gameModel } from '~/model/game_model';
import { mainScene } from './main_scene';
import { gameController } from '~/controller/game_controller';

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
    this.endRoomBtn.on(Laya.Event.CLICK, this, gameController.onClickEndGame);
    this.attackBtn.on(Laya.Event.CLICK, this, gameController.onClickTalkAttack);
    this.reconnectBtn.on(Laya.Event.CLICK, this, gameController.onClickReconnect)
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

  renderServerTime(){
    this.serverTime.text = `${gameModel.environment}: ${gameModel.serverTime}`;
  }

  renderPlayers() {
    if (gameModel.twoPlayersInfo) {
    //     const [ playerA, playerB ] = tiagoModel.twoPlayersInfo;

    //     if (playerA) {
    //         this.playerAOpenId = playerA.openId;
    //         const name = playerA.isAI ? `AI: ${playerA.nickName}` : playerA.nickName;
    //         this.labelPlayerANickName.string = name;
    //         utils.renderAvatar(this.spritePlayerAAvatar, playerA.avatarUrl);
    //     }

    //     if (playerB) {
    //         this.playerBOpenId = playerB.openId;
    //         const name = playerB.isAI ? `AI: ${playerB.nickName}` : playerB.nickName;
    //         this.labelPlayerBNickName.string = name;
    //         utils.renderAvatar(this.spritePlayerBAvatar, playerB.avatarUrl);
    //     }
    }
}
  // endregion
}

// 全局实例，如果需要管理，可以设置管理类，来管理所有场景
export const gameScene = new GameScene()