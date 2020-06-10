import tiago from '@byted-creative/tiago';
import { tiagoModel } from '~/model/tiago_model';

class TiagoController{
  /**
   * 初始化Tiago
   *
   * @memberof TiagoController
   */
  init(){
    tiago.init({
      appId: ' ',
      debug: true,
    }).then(() => {
      tiagoModel.tiagoInited = true;
      console.log('tiago init success.');
      tiagoModel.config = tiago.getConfig();
      console.log('tiagoModel.config', tiagoModel.config);
    }).catch((err:any)=> {
      console.log(err);
      // NOTE: 一般情况不会出错，我们会对错误情况做监控，游戏可以处理一些异常情况下的表现
    });
  }



  

}
export const tiagoController = new TiagoController();