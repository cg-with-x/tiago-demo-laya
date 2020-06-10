import { Room } from '@byted-creative/pvp-client/build/game_room/room';
import { tiagoModel } from '~/model/tiago_model';
import tiago from '@byted-creative/tiago';

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
    tiagoModel.room = undefined;
  }
  RoomInited = false;

  init(result: any){
    // NOTE: 随后可以加入游戏房间
    const room = tiago.joinGameRoom({
        roomNum: result.roomNum,
    });

    // 交由 room_manager 进行管理
    this.loadRoom(room);
  }
  loadRoom(room: Room) {
    tiagoModel.room = room;
    
    room.on(roomEvent.open, () => {
      console.log('[room] 进入游戏成功!');

      // NOTE: 如果游戏场景比较复杂，可以预加载一下
      // Laya.Scene.open('game', () => {
      //     if (this.room) {
      //         this.room.send(JSON.stringify({
      //             event: 'ready',
      //         }));
      //     }
      // });
    });

    room.on(roomEvent.message, ({ message }:any ) => {
      console.log('[room] 接受到消息: ', message);

      // const scene = cc.director.getScene();
      // if (scene.name === 'game') {

      //     // NOTE: 也可以使用 Event 方式传递
      //     const canvas = scene.getChildByName('Canvas');
      //     if (canvas) {
      //         canvas.getComponent('game').onRoomMessage(message);
      //     }
      // }
    });

    room.on(roomEvent.close, () => {
      console.log('[room] 房间关闭!');

      // NOTE: 根据需要进行重新连接
      // setTimeout(() => {
      //     room.reconnect();
      // }, 1000)
    });

    room.on(roomEvent.error, (param:any) => {
      console.log('[room] 房间出错:', param);
    });

    room.on(roomEvent.reconnecting, (param:any) => {
      console.log('[room] 重连中...', param);
    });
  }

  leave() {
    if (tiagoModel.room) {
      tiagoModel.room.close();
      tiagoModel.room = undefined;
    }
  }
}

export const roomController =  new RoomController();