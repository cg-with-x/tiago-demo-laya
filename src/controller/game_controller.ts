import { gameModel } from '~/model/game_model';
import { tiagoModel } from '~/model/tiago_model';
import { gameScene } from '~/view/game_scene';
import { mainScene } from '~/view/main_scene';

import { roomController } from './room_controller';
import tiago from '@byted-creative/tiago';

class GameController{
  isGaming = false;
  
  onClickEndGame() {
      if (!roomController.room) return
      roomController.room.send(JSON.stringify({
          event: 'bye',
      }));
      // NOTE: 退出房间连麦
      tiago.leaveRTCFromGameRoom(roomController.room);
      roomController.leave();
      mainScene.loadOpen();
       // NOTE: 如果之前在一个组队中，则回到队伍
      if (tiagoModel.currentTeam){
        tiagoModel.currentTeam.return();
      }
  }

  onClickTalkAttack() {
    if (!roomController.room) return
     
    roomController.room.send(JSON.stringify({
        event: 'talk',
        data: Math.round(Math.random() * (100 - 0)) + 0,
    }));

  }

  onClickReconnect() {
    if (roomController.room) {
        roomController.room.reconnect();
    }
  }

  onRoomMessage(messageStr: string|ArrayBuffer) {
    // NOTE: 消息体的内容是开发者自己定义的，这里的代码只是一种示例
    // NOTE: 开发者可以根据自己的房间脚本和协议，实现自身游戏的逻辑
    if (typeof(messageStr) !== "string") return;
    const message = JSON.parse(messageStr);

    if (message.length) {
      message.forEach(({ event, data}: {event:string, data:any}) => {
        switch (event) {
          case 'game-start':
            break;
          case 'environment':
            gameModel.environment = data;
            break;
          case 'info':
            gameModel.twoPlayersInfo = data;
            gameScene.renderPlayers();
            break;
          case 'server-time':
            gameModel.serverTime = data;
            gameScene.renderServerTime();
            break;
          case 'talk':
            gameScene.renderTalk(data);
            break;
          case 'game-over':
            roomController.leave();
            mainScene.loadOpen();
            break;
          default:
              break;
        }
      })
    }
  }

}

export const gameController = new GameController();