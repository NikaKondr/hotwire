/// <reference types="react-scripts" />

declare module '*.style.scss' {
    const classes: { readonly [ key: string ]: string };
    export default classes;
}
interface EventMpPool {
    add( eventName: RageEnums.EventKey | string, callback: ( ...args: any[] ) => void ): void;
    add( events: ( { [ name: string ]: ( ...args: any[] ) => void; } ) ): void;
    call( eventName: string, ...args: any[] ): void;
    remove( eventName: string, handler?: ( ...args: any[] ) => void ): void;
    remove( eventNames: string[] ): void;
}
interface Mp {
    events: EventMpPool;
    trigger( eventName: string, params: any ): void;
}
declare const mp: Mp;