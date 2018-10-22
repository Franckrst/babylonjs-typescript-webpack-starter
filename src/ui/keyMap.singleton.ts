import {bound} from "../tools/decorators/bound";
import {singleton} from "../tools/decorators/singleton";

export enum KeyMapEvent {
    RESIZE = 'resize',
    KEY_DOWN = 'keydown',
    KEY_UP = 'keyup'
}
export type keyMapListener = (event:KeyboardEvent)=>void;

@singleton
export class KeyMapSingleton{

    private listeners : {[KeyMapEvent:string] : keyMapListener[]} = {};

    protected constructor() {
        console.log('zaeaez');
        this.initEvent(KeyMapEvent.RESIZE);
        this.initEvent(KeyMapEvent.KEY_DOWN);
        this.initEvent(KeyMapEvent.KEY_UP);
    }

    public static getInstance () : KeyMapSingleton {
        return new KeyMapSingleton();
    }

    public add (key : KeyMapEvent, listener : keyMapListener,index?: number) : ()=>void {
        this.listeners[key].push(listener);
        return ()=>this.remove(key, listener);
    }

    public remove(key : KeyMapEvent, listener : keyMapListener) : void {
        delete this.listeners[this.listeners[key].indexOf(listener)]
    }

    private initEvent(key : KeyMapEvent) : void {
        this.listeners[key] = [];
        window.addEventListener(key, this.dispatch(key));
    }

    @bound
    private dispatch (key : KeyMapEvent) : keyMapListener {
        return (event : KeyboardEvent) => {
            const listener = this.listeners[key].slice(-1)[0];
            if(listener) { listener(event); }
        }
    }
}