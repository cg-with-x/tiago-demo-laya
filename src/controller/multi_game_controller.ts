import { multiGameModel } from "~/model/multi_game_model";
import { tiagoModel } from "~/model/tiago_model";
import { mainScene } from "~/view/main_scene";
import { multiGameScene } from "~/view/multi_game_scene";
import { settleScene } from '~/view/settle_scene';
import recordController from './record_controller';
import { roomController } from "./room_controller";
import { tiagoController } from './tiago_controller';

class MultiGameController {
  isGaming = false;

  onEndGame(){
    settleScene.loadOpen();
    if (!roomController.room) return;
    roomController.room.send(
      JSON.stringify({
        event: "bye",
      })
    );
  }

  onPositiveEndGame(){
    settleScene.loadOpen();
  }

  onEndRoom() {
    // 停止录屏上传视频
    tiagoController.canUploadVideo = true;
    recordController.stop();
    
    mainScene.loadOpen();
    if (!roomController.room) return;
    // 离开房间
    roomController.leave();
    // NOTE: 如果之前在一个组队中，则回到队伍
    if (tiagoModel.currentTeam) {
      tiagoModel.currentTeam.return();
    }
  }

  onClickTalkAttack() {
    if (!roomController.room) return;

    roomController.room.send(
      JSON.stringify({
        event: "talk",
        data: Math.round(Math.random() * (100 - 0)) + 0,
      })
    );
  }

  onClickReconnect() {
    if (roomController.room) {
      roomController.room.reconnect();
    }
  }

  onRoomMessage(messageStr: string | ArrayBuffer) {
    // NOTE: 消息体的内容是开发者自己定义的，这里的代码只是一种示例
    // NOTE: 开发者可以根据自己的房间脚本和协议，实现自身游戏的逻辑
    if (typeof messageStr !== "string") return;
    const message = JSON.parse(messageStr);

    if (message.length) {
      message.forEach(({ event, data }: { event: string; data: any }) => {
        switch (event) {
          case "game-start":
            roomController.joinRtcRoom();
            recordController.start();
            break;
          case "environment":
            multiGameModel.environment = data;
            break;
          case "info":
            multiGameModel.multiPlayersInfo = data;
            multiGameScene.renderPlayers();
            break;
          case "server-time":
            multiGameModel.serverTime = data;
            multiGameScene.renderServerTime();
            break;
          case "talk":
            multiGameScene.renderTalk(data);
            break;
          case "game-over":
            this.onPositiveEndGame()
            break;
          default:
            break;
        }
      });
    }
  }
}

export const multiGameController = new MultiGameController();
