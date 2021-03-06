import { tiagoController } from './tiago_controller';

class RecordController {
  constructor() {
    if (typeof tt === "undefined") {
      return;
    }
    this._recordManager = tt.getGameRecorderManager();
    this._recordManager.onStop((res) => {
      console.warn("录屏结束");
      console.log(res.videoPath);
      // 保存下来videoPath
      this.videoPath = res.videoPath;

      tiagoController.uploadVideo();
    });
    this._recordManager.onStart(() => {
      console.warn("录屏开始");
      tiagoController.canUploadVideo = false;
      this.videoPath = undefined;
    });
  }

  private _recordManager?: tt.GameRecorderManager;

  public videoPath?: string;

  public stop() {
    if (this._recordManager) {
      this._recordManager.stop();
    }
    if (this.videoPath){
      tiagoController.uploadVideo();
    }
  }
  public start() {
    if (this._recordManager) {
      this._recordManager.start({duration:300});
    }
  }
}

let recordController = new RecordController();
export default recordController;
