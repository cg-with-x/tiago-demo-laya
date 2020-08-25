class RecordController {
  constructor(){
    this.recordManager = tt.getGameRecorderManager();
    this.recordManager.onStop((res) => {
      console.log("录屏结束");
      console.log(res.videoPath);
      // 保存下来videoPath
      this.videoPath = res.videoPath;
    });
    this.recordManager.onStop((res) => {
      console.log("录屏开始");
      this.videoPath = undefined;
    })
  }

  public recordManager: tt.GameRecorderManager ;

  public videoPath?: string;
}

let recordController = new RecordController();
export default recordController;
