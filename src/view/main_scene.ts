import { tiagoController } from '~/controller/tiago_controller';
import { tiagoModel } from '~/model/tiago_model';
import { loadAvatarImg } from '~/util/avatarImg';

export default class MainScene extends Laya.Scene {
  constructor(){
    super();
    this.url = "main_scene.json"
  }
  // region ========================================  Laya UI组件  ========================================
  // 用户头像
  avatar!: Laya.Image;
  // 用户昵称
  nickname!: Laya.Label;
  // 按钮: 获取配置信息
  getConfigBtn!: Laya.Button;
  // 按钮: 获取用户信息
  getUserInfoBtn!: Laya.Button;
  // 按钮: 1v1 匹配 (带AI)
  matchWithAIBtn!: Laya.Button;
  // 按钮: 1v1 匹配
  matchBtn!: Laya.Button;
  // 按钮: 组队-单人-2人-AI
  teamMatch2AIBtn!: Laya.Button;
  // 按钮: 组队-单人-2人
  teamMatch2Btn!: Laya.Button;
  // 按钮: 组队-单人-6人-AI
  teamMatch6AIBtn!: Laya.Button;
  // 按钮: 组队-单人-6人
  teamMatch6Btn!: Laya.Button;
  // 输入: 房间号输入
  roomNumInput!: Laya.Input;
  // 按钮: 加入房间
  joinRoomBtn!: Laya.Button;
  // 输入: 房间人数
  peopleNumInput!: Laya.Input;
  // 按钮: 创建组队
  createTeamBtn!: Laya.Button;
  // 输入: 麦克风位置
  micPosX!: Laya.Input;
  micPosY!: Laya.Input;
  // 按钮: 调整麦克风位置
  changeMicPosBtn!: Laya.Button;
  // 按钮: 禁止邀请
  teamForbidInviteBtn!: Laya.Button;
  // 按钮: 满员匹配
  teamForbidMatchBtn!: Laya.Button;
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
    this.teamMatch2AIBtn.on(Laya.Event.CLICK, this, ()=>{
      this.onClickTeamMatch(2,true)
    })
    this.teamMatch2Btn.on(Laya.Event.CLICK, this, ()=>{
      this.onClickTeamMatch(2,false)
    })
    this.teamMatch6AIBtn.on(Laya.Event.CLICK, this, ()=>{
      this.onClickTeamMatch(6,true)
    })
    this.teamMatch6Btn.on(Laya.Event.CLICK, this, ()=>{
      this.onClickTeamMatch(6,false)
    })
    this.joinRoomBtn.on(Laya.Event.CLICK, this, this.onClickJoinTeam)
    this.createTeamBtn.on(Laya.Event.CLICK, this, this.onClickCreateTeam)
    this.changeMicPosBtn.on(Laya.Event.CLICK, this, this.onClickChangeMicPos)
    this.teamForbidInviteBtn.on(Laya.Event.CLICK, this, this.onClickTeamForbidInvite)
    this.teamForbidMatchBtn.on(Laya.Event.CLICK, this, this.onClickTeamForbidMatch)
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

  onClickTeamMatch(size: number, needAI: boolean){
    tiagoController.makeTeam(size, needAI)
  }

  onClickJoinTeam(){
    tiagoController.joinTeam(this.roomNumInput.text)
  }

  onClickCreateTeam(){
    tiagoController.makeTeam(parseInt(this.peopleNumInput.text), false)
  }

  onClickChangeMicPos(){
    tiagoController.changeMicPos(parseInt(this.micPosX.text), parseInt(this.micPosY.text))
  }

  onClickTeamForbidInvite(){
    tiagoController.makeTeamWithoutInvite();
  }

  onClickTeamForbidMatch(){
    tiagoController.makeTeamWithoutMatchBtn();
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
      Laya.Handler.create(this, (res:any)=>{
        this.loadScene(this.url);
        this.open(closeOther, onOpenedParam);
      })
    );
  }

  public renderAvatar(){
    // 加载小程序头条
    loadAvatarImg(tiagoModel.selfUserInfo.avatarUrl).then((result)=>{
      // @ts-ignore 头像加载的skin已添加进入Laya自带的loader流，一般情况无需使用Laya的私有方法
      // this.avatar._bitmap.source= result;
      this.avatar.skin = tiagoModel.selfUserInfo.avatarUrl;
      this.nickname.text = tiagoModel.selfUserInfo.nickName;
    });

  }
  // endregion
}

// 全局单例，如果需要管理，可以设置管理类，来管理所有场景
export const mainScene = new MainScene()