// import MainScene from 'src/view/main_scene';
// import { Room } from '/@byted-creative/pvp-client/build/game_room/room';

// const roomEvent: RoomEvent = {
//     open: "open",
//     message: 'message',
// }
enum roomEvent {
    open = "open" // 游戏房间开始
}

// NOTE: 房间服务的事件抽出单独处理
class RoomController {
    constructor() {
        this.room = undefined;
    }

    room?: any;
    loadRoom(room: any) {
        this.room = room;
        
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

        room.on('message', ({ message }:any ) => {
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

        room.on('close', () => {
            console.log('[room] 房间关闭!');

            // NOTE: 根据需要进行重新连接
            // setTimeout(() => {
            //     room.reconnect();
            // }, 1000)
        });

        room.on('error', (param:any) => {
            console.log('[room] 房间出错:', param);
        });

        room.on('reconnecting', (param:any) => {
            console.log('[room] 重连中...', param);
        });
    }

    leave() {
        if (this.room) {
            this.room.close();
            this.room = undefined;
        }
    }
}

export const roomController =  new RoomController();