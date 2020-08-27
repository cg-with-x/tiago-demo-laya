import { gameModel } from "~/model/game_model";
import { tiagoModel } from "~/model/tiago_model";
import { gameScene } from "~/view/game_scene";
import { mainScene } from "~/view/main_scene";

import { roomController } from "./room_controller";
import tiago from "@byted-creative/tiago";
import recordController from './record_controller';
import { tiagoController } from './tiago_controller';

class GameController {
  isGaming = false;

  onClickEndGame() {
    // 停止录屏上传视频
    recordController.stop();
    tiagoController.uploadVideo();
    
    if (!roomController.room) return;
    roomController.room.send(
      JSON.stringify({
        event: "bye",
      })
    );
  }

  onGameOver() {
    roomController.leaveRtcRoom();
    roomController.leave();

    mainScene.loadOpen();
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
            recordController.start();
            roomController.joinRtcRoom();
            break;
          case "environment":
            gameModel.environment = data;
            break;
          case "info":
            gameModel.twoPlayersInfo = data;
            gameScene.renderPlayers();
            break;
          case "server-time":
            gameModel.serverTime = data;
            gameScene.renderServerTime();
            break;
          case "talk":
            gameScene.renderTalk(data);
            break;
          case "game-over":
            this.onGameOver();
            break;
          default:
            break;
        }
      });
    }
  }
}

export const gameController = new GameController();
