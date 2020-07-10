import { tiagoModel } from "~/model/tiago_model";
import { mainScene } from "~/view/main_scene";

import { roomController } from "./room_controller";
import { multiGameModel } from "~/model/multi_game_model";
import { multiGameScene } from "~/view/multi_game_scene";
import { settleScene } from '~/view/settle_scene';

class MultiGameController {
  isGaming = false;

  onClickEndGame(){
    settleScene.loadOpen();
    if (!roomController.room) return;
    roomController.room.send(
      JSON.stringify({
        event: "bye",
      })
    );
    roomController.leave();
  }

  onEndRoom() {
    mainScene.loadOpen();
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
            roomController.leave();
            settleScene.loadOpen();
            break;
          default:
            break;
        }
      });
    }
  }
}

export const multiGameController = new MultiGameController();
