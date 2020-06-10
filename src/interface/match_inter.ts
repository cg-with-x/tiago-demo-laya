import { Match } from '@byted-creative/tiago/dist/match';

export enum matchEvents{
    "match-success" = "match-success",
    "create-game-room-success" = "create-game-room-success",
    "error" = "error"
}

export interface MatchEvents {
    "match-success": undefined; 
    
}

type Ma = Omit<Match, "on" | "off" | "once" | "emit" | "removeAllListeners">;

// declare class Ma implements Omit<Match, "on">
export interface MatchExtends extends Ma {
    on<T extends keyof MatchEvents>(eventName: T, listener: (param: MatchEvents[T]) => void): this;
    off<T extends keyof MatchEvents>(eventName: T, listener: (param: MatchEvents[T]) => void): this;
    once<T extends keyof MatchEvents>(eventName: T, listener: (param: MatchEvents[T]) => void): this;
    removeAllListeners<T extends keyof MatchEvents>(eventName: T): this;
    emit<T extends keyof MatchEvents>(eventName: T, param: MatchEvents[T]): boolean;
}
