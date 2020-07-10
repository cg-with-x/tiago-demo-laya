import { multiGameController } from "./multi_game_controller";
import { matchEvents } from "~/interface/match_inter";
import { tiagoModel } from "~/model/tiago_model";
import { gameScene } from "~/view/game_scene";
import { mainScene } from "~/view/main_scene";

import tiago from "@byted-creative/tiago";

import { gameController } from "./game_controller";
import { roomController } from "./room_controller";
import { multiGameScene } from "~/view/multi_game_scene";
import { TiagoTeamTask } from '@byted-creative/tiago/lib/services/team';

class TiagoController {
  tiagoInited: boolean = false;
  /**
   * 初始化Tiago
   *
   * @memberof TiagoController
   */
  init() {
    try {
      tiago.init({
        appId: "tt2ac55c78b5ff1f37",
        debug: true,
        onJoinTeam: (team: TiagoTeamTask) => {
          this.onJoinTeam(team);
        },
      });

      this.tiagoInited = true;
      console.log("tiago init success.");
    } catch (err) {
      console.log(err);
      // NOTE: 一般情况不会出错，我们会对错误情况做监控，游戏可以处理一些异常情况下的表现
    }
  }

  getConfig() {
    if (!this.tiagoInited) return;
    tiagoModel.config = tiago.getConfig();
    console.log("tiagoModel.config", tiagoModel.config);

    // 根据场景值可以拿到各个场景的参数
    if (tiagoModel.config.currentScene === tiago.BUSINESS_SCENE.LiveRoom) {
      // 当前是直播场景
      const params = tiagoModel.config.scene[tiagoModel.config.currentScene];

      if (params && params.isNewcomer) {
        // NOTE: 补充新手逻辑
        console.log("新手首次加入游戏");
      }

      // NOTE: 针对直播场景，调整使用直播专用的 UI，或处理其他特殊逻辑
    } else if (
      tiagoModel.config.currentScene === tiago.BUSINESS_SCENE.Wonderland
    ) {
      // 当前是 W 场景
    }
  }

  getUserInfo() {
    if (!this.tiagoInited) return;

    const info = tiago.getUserInfo();
    console.log(info);

    // NOTE: 这里只是简单的保存下来
    tiagoModel.selfUserInfo = info;
    mainScene.renderAvatar();
  }

  startSingleMatch(needAI: boolean) {
    tiagoModel.currentTeam = undefined;
    const match = tiago.startSingleMatch({
      isAutoAppendAI: needAI, // 支持 AI 逻辑
    });
    if (match === undefined) return;
    // TODO 字符串变为枚举类型，并且需要根据对应类型，定义result类型。
    match.on(matchEvents["match-success"], (result) => {
      // 获得匹配成功后的用户信息
      console.log(result);

      // NOTE: 如果游戏场景比较复杂，可以预加载一下
      gameScene.loadOpen();
      gameController.isGaming = true;
    });

    match.on(matchEvents["create-game-room-success"], (result) => {
      console.log(result);

      // 交由 room_manager 进行管理
      roomController.init(result);
    });

    match.on(matchEvents.error, (error) => {
      console.log(error);
    });
  }

  makeTeam(size: number, needAI: boolean) {
    tiagoModel.currentTeam = undefined;
    const team = tiago.makeTeam({
      teamSize: size,
      isAutoJoinRTC: true,
      match: {
        type: tiago.MATCH_TYPE.Single,
        gameRoomScriptId: "room-366",
        minPlayerCount: 1,
        isAutoAppendAI: needAI,
      },
    });

    tiagoModel.currentTeam = team;
  }

  onJoinTeam(team: TiagoTeamTask) {
    // NOTE: 可以在适当的时机进行清理，例如：在每次 makeTeam 之前。
    tiagoModel.currentTeam = team;

    team.on("match-success", (result) => {
      // 获得匹配成功后的用户信息
      console.log(result);

      // NOTE: 如果游戏场景比较复杂，可以预加载一下
      multiGameScene.loadOpen();
      multiGameController.isGaming = true;
    });

    team.on("create-game-room-success", (result) => {
      console.log("create-game-room-success",result);

      // 交由 room_manager 进行管理
      roomController.init(result);
    });

    team.on("error", (error) => {
      console.log(error);
    });
  }

  /**
   * 加入别的房间
   *
   * @param {string} number
   * @memberof TiagoController
   */
  joinTeam(number: string) {
    // const { tiago, tiagoInited } = dataManager;
    if (this.tiagoInited) {
      const { BUSINESS_SCENE, GAME_ENV } = tiago;
      const config = tiago.getConfig();
      tiago.utils.joinTeamRoom({
        roomNum: number,
        currentScene: BUSINESS_SCENE.Wonderland,
        gameEnv: GAME_ENV.Test,
      });
    }
  }
}
export const tiagoController = new TiagoController();
