export default class MainScene extends Laya.Scene {
  constructor(){
    super();
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
  }
  // endregion
  // region ========================================  自定义方法  ========================================
  // endregion
}