import { tiagoModel } from './../model/tiago_model';

import { roomController } from '~/controller/room_controller';
import { multiGameController } from '~/controller/multi_game_controller';
import { multiGameModel } from '~/model/multi_game_model';

export default class MultiGameScene extends Laya.Scene {
  constructor(){
    super();
    this.url = "multi_game_scene.json"
  }
  // region ========================================  Laya UI组件  ========================================
  serverTime!: Laya.Label;
  attackBtn!: Laya.Button;
  endGameBtn!: Laya.Button;
  reconnectBtn!: Laya.Button;
  playerList!: Laya.Box;
  // endregion
  // region ========================================  自定义参数  ========================================
  private _playerSpriteList: Map<string, Laya.Sprite> = new Map();
  // endregion
  // region ========================================  Laya 生命周期  ========================================
  onAwake(){
    super.onAwake();
  }

  onEnable(){
    super.onEnable();

    this.endGameBtn.on(Laya.Event.CLICK, this, multiGameController.onEndGame);
    this.attackBtn.on(Laya.Event.CLICK, this, multiGameController.onClickTalkAttack);
    this.reconnectBtn.on(Laya.Event.CLICK, this, multiGameController.onClickReconnect)
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
    this.serverTime.text = `${multiGameModel.environment}: ${multiGameModel.serverTime}`;
  }

  // 刷新玩家
  renderPlayers() {
    this.playerList.removeChildren();
    if (multiGameModel.multiPlayersInfo) {
      let offY = 0;
      const infoList = multiGameModel.multiPlayersInfo;
      for (let i = 0; i < infoList.length; i++ ){
        const playerSprite = new Laya.Sprite();
        const tip = new Laya.Label();
        const nickname = new Laya.Label();
        playerSprite.y = offY;
        offY += 70;

        tip.name = 'tip';
        tip.color = '#ffffff';
        tip.fontSize = 32;
        tip.text = '战斗力 +0';
        tip.x = 300;

        nickname.color = '#ffffff';
        nickname.fontSize = 32;
        nickname.text = infoList[i].isAI ? `AI: ${infoList[i].nickName}` : infoList[i].nickName;
        if (tiagoModel.selfUserInfo && infoList[i].openId === tiagoModel.selfUserInfo.openId)
          nickname.text = `Me: ${infoList[i].nickName}`

        playerSprite.addChild(tip);
        playerSprite.addChild(nickname);

        this._playerSpriteList.set(infoList[i].openId, playerSprite)
        this.playerList.addChild(playerSprite);
        
      }
    }
  }

  renderTalk({ openId, data }: {openId:string, data:any}) {
    const tipText = `战斗力 +${data}`;
    const sprite = this._playerSpriteList.get(openId);
    if (sprite){
      const tip = sprite.getChildByName('tip') as Laya.Label;
      tip.text = tipText;
    }
  }
  // endregion
}

// 全局实例，如果需要管理，可以设置管理类，来管理所有场景
export const multiGameScene = new MultiGameScene()