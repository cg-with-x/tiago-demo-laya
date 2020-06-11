import { tiagoController } from '~/controller/tiago_controller';
import tiago from '@byted-creative/tiago';
import { tiagoModel } from '~/model/tiago_model';
import { roomController } from '~/controller/room_controller';
import { avatarImg } from '~/util/avatarImg';


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
  // 用户头像
  avatar!: Laya.Image;
  // 用户昵称
  nickName!: Laya.Label;
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
    this.matchBtn.on(Laya.Event.CLICK, this, this.onClickStartSingleMatch)
    this.matchWithAIBtn.on(Laya.Event.CLICK, this, this.onClickStartSingleMatchAI)
  }

  onClickGetConfig(){
    tiagoController.getConfig();
  }


  onClickGetUserInfo(){
    tiagoController.getUserInfo();
  }

  onClickStartSingleMatch() {
    tiagoController.startSingleMatch(false);
  }
  
  onClickStartSingleMatchAI() {
    tiagoController.startSingleMatch(true)
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

  public renderAvatar(){
    this.avatar.texture = avatarImg(tiagoModel.selfUserInfo.avatarUrl);
  }
  // endregion
}

// 全局单例，如果需要管理，可以设置管理类，来管理所有场景
export const mainScene = new MainScene()