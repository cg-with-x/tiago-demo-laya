class RecordController {
  constructor(){
    this.recordManager = tt.getRecorderManager();
    this.recordManager.onStop((res) => {
      console.log("录屏结束");
      console.log(res.tempFilePath);
      // 保存下来videoPath
      this.videoPath = res.tempFilePath;
    });
    this.recordManager.onStop((res) => {
      console.log("录屏开始");
      this.videoPath = undefined;
    })
  }

  public recordManager: tt.RecorderManager;

  public videoPath?: string;
}

let recordController = new RecordController();
export default recordController;
