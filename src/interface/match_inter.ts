import { Match } from '@byted-creative/tiago/dist/match';

export interface MatchEvents {
    "match-success": undefined; 
    // open: undefined;
    // message: {
    //     message: string | ArrayBuffer;
    // };
    // close: undefined;
    // error: {
    //     code: number;
    //     message?: string;
    //     errMsg?: string;
    // };
    // notifyRoomPrepared: undefined;
    // reconnecting: undefined;
}
type T0 = Exclude<MatchEvents, "match-success">;  
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Omit<Todo, 'title' | 'completed'>;

type Ma = Omit<Match, "on" | "off" | "once" | "emit" | "removeAllListeners">;

// declare class Ma implements Omit<Match, "on">
export interface MatchExtends extends Ma {
    on<T extends keyof MatchEvents>(eventName: T, listener: (param: MatchEvents[T]) => void): this;
    off<T extends keyof MatchEvents>(eventName: T, listener: (param: MatchEvents[T]) => void): this;
    once<T extends keyof MatchEvents>(eventName: T, listener: (param: MatchEvents[T]) => void): this;
    removeAllListeners<T extends keyof MatchEvents>(eventName: T): this;
    emit<T extends keyof MatchEvents>(eventName: T, param: MatchEvents[T]): boolean;
}
