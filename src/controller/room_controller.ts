import tiago from '@byted-creative/tiago';
import { RoomResult } from '@byted-creative/tiago/lib/interfaces';
import { gameController } from './game_controller';
import { multiGameController } from './multi_game_controller';
import { Room } from '@byted-creative/pvp-client/build/game_room/room';

/**
 * 此为tiago定义的房间事件。
 * 其中为message时，会传输为用户使用房间派发的自定义事件
 *
 * @enum {number}
 */
enum roomEvent {
    open = "open", // 进入游戏房间开始
    message = "message", // 自定义房间消息, 根据房间服务脚本自定义
    close = "close", // 关闭房间
    error = "error", // 游戏房间错误
    reconnecting = "reconnecting", // 重连中
}

// NOTE: 房间服务的事件抽出单独处理
class RoomController {
  constructor() {
    this.room = undefined;
  }
  roomInited = false;

  room?: Room;
  init(result: RoomResult){
    // NOTE: 随后可以加入游戏房间
    const room = tiago.joinGameRoom({
        roomNum: result.roomNum,
    });

    // 交由 room_manager 进行管理
    this.loadRoom(room);
  }

  leaveRtcRoom(){
    if (!this.room) return

    tiago.leaveRTCFromGameRoom(this.room);
  }

  joinRtcRoom(){
    if (!this.room) return

    tiago.joinRTCForGameRoom(this.room);
  }

  loadRoom(room: any) {
    this.room = room;
    
    room.on(roomEvent.open, () => {
      console.log('[room] 进入游戏成功!');

      this.room && this.room.send(JSON.stringify({
        event: 'ready',
      }));
    }); 

    room.on(roomEvent.message, ({ message }: any ) => {
      if (gameController.isGaming){
        console.log('[room] 接受到消息: ', message);
        gameController.onRoomMessage(message);
      }
      if (multiGameController.isGaming){
        console.log('[multi-room] 接受到消息: ', message);
        multiGameController.onRoomMessage(message);
      }
    });

    room.on(roomEvent.close, () => {
      console.log('[room] 房间关闭!');

      // NOTE: 根据需要进行重新连接
      // Laya.timer.once(1000, this, () => {
      //     room.reconnect();
      // })
    });

    room.on(roomEvent.error, (param:any) => {
      console.log('[room] 房间出错:', param);
    });

    room.on(roomEvent.reconnecting, (param:any) => {
      console.log('[room] 重连中...', param);
    });
  }

  leave() {
    this.leaveRtcRoom()
    if (this.room) {
      this.room.close();
      this.room = undefined;
    }
    gameController.isGaming = false;
    multiGameController.isGaming = false;
  }
}

export const roomController =  new RoomController();