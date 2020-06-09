import { PlayerInfo } from "../../node_modules/@byted-creative/tiago/dist/interface";

class TiagoModel{
  tiagoInit: boolean = false;
  selfUserInfo?: PlayerInfo;
  twoPlayersInfo?: PlayerInfo;
  environment: any = "";
}
export const tiagoModel = new TiagoModel();