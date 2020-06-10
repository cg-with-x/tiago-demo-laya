import { tiagoModel } from '~/model/tiago_model';
import tiago from '@byted-creative/tiago';
import { roomController } from './room_controller';
import { mainScene } from '~/view/main_scene';

class GameController{
  isGaming = false;
  onClickStopGame() {
      if (!tiagoModel.room) return
      tiagoModel.room.send(JSON.stringify({
          event: 'bye',
      }));
      roomController.leave();
      mainScene.loadOpen();
  }

  onClickTalk() {
    if (!tiagoModel.room) return
     
    tiagoModel.room.send(JSON.stringify({
        event: 'talk',
        data: Math.random() * 100,
    }));

  }

  onClickReconnect() {
    if (tiagoModel.room) {
        tiagoModel.room.reconnect();
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
                //   dataManager.environment = data;
                  break;
              case 'info':
                //   dataManager.twoPlayersInfo = data;
                  this.renderPlayers();
                  break;
              case 'server-time':
                //   this.labelServerTime.string = `${dataManager.environment}: ${data}`;
                  break;
              case 'talk':
                  // this.renderTalk(data);
                  break;
              case 'game-over':
                  // tiagoModel.leave();
                  // cc.director.loadScene('start');
                  break;
              default:
                  break;
          }
      })
    }
  }

  renderPlayers() {
      // if (tiagoModel.twoPlayersInfo) {
      //     const [ playerA, playerB ] = tiagoModel.twoPlayersInfo;

      //     if (playerA) {
      //         this.playerAOpenId = playerA.openId;
      //         const name = playerA.isAI ? `AI: ${playerA.nickName}` : playerA.nickName;
      //         this.labelPlayerANickName.string = name;
      //         utils.renderAvatar(this.spritePlayerAAvatar, playerA.avatarUrl);
      //     }

      //     if (playerB) {
      //         this.playerBOpenId = playerB.openId;
      //         const name = playerB.isAI ? `AI: ${playerB.nickName}` : playerB.nickName;
      //         this.labelPlayerBNickName.string = name;
      //         utils.renderAvatar(this.spritePlayerBAvatar, playerB.avatarUrl);
      //     }
      // }
  }

  renderTalk({ event, data }: {event:string, data:any}) {
      // const tip = `战斗力 +${data}`;
      // if (openId === this.playerAOpenId) {
      //     this.labelPlayerATip.string = tip;
      // } else if (openId === this.playerBOpenId) {
      //     this.labelPlayerBTip.string = tip;
      // }
  }
}

export const gameController = new GameController();