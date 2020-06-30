import { gameController } from '~/controller/game_controller';
import { roomController } from '~/controller/room_controller';
import { gameModel } from '~/model/game_model';
import { loadAvatarImg } from '~/util/avatarImg';



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

  playerA!: Laya.Sprite;
  tipA!: Laya.Label;
  avatarA!: Laya.Image;
  nicknameA!: Laya.Label;

  playerB!: Laya.Sprite;
  tipB!: Laya.Label;
  avatarB!: Laya.Image;
  nicknameB!: Laya.Label;
  // endregion
  // region ========================================  自定义参数  ========================================
  playerAOpenId?: string;
  playerBOpenId?: string;
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
        const [ playerA, playerB ] = gameModel.twoPlayersInfo;

        if (playerA) {
            this.playerAOpenId = playerA.openId;
            const name = playerA.isAI ? `AI: ${playerA.nickName}` : playerA.nickName;
            this.nicknameA.text = name;
            loadAvatarImg(playerA.avatarUrl).then((result)=>{
              this.avatarA.skin = playerA.avatarUrl;
            });
        }

        if (playerB) {
            this.playerBOpenId = playerB.openId;
            const name = playerB.isAI ? `AI: ${playerB.nickName}` : playerB.nickName;
            this.nicknameB.text = name;
            loadAvatarImg(playerB.avatarUrl).then((result)=>{
              this.avatarB.skin = playerB.avatarUrl;
            });
        }
    }
  }

  renderTalk({ openId, data }: {openId:string, data:any}) {
    const tip = `战斗力 +${data}`;
    if (openId === this.playerAOpenId) {
        this.tipA.text = tip;
    } else if (openId === this.playerBOpenId) {
        this.tipB.text = tip;
    }
  }
  // endregion
}

// 全局实例，如果需要管理，可以设置管理类，来管理所有场景
export const gameScene = new GameScene()