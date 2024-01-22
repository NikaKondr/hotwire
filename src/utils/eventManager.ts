import rpc from 'rage-rpc'

const isDev: boolean = process.env.NODE_ENV === 'development';
let eventsInMemory: Array<{ id: number; target: string; name: string; handler: any }> = [];

class EventManager {
	static addHandler = ( eventTarget: string, eventName: string, handler: any ): void => {
		if ( !eventsInMemory.find( ( el ) => el.target === eventTarget && el.name === eventName ) ) {
			eventsInMemory.push( {
				id: eventsInMemory.length,
				target: eventTarget,
				name: eventName,
				handler: handler
			} );
		}
	};

	static callHandler = ( event: string, ...args: any[] ): void => {
		const [ target, eventName ]: string[] = event.split( ':' );
		const index: number = eventsInMemory.findIndex( ( el ) => el.target === target && el.name === eventName );

		if ( index !== -1 ) {
			eventsInMemory[ index ].handler( ...args );
			if ( isDev ) {
				console.log( `%c cef::${ eventsInMemory[ index ].target }:${ eventsInMemory[ index ].name } called`, 'background: yellow; color: black; font-weight: 700; padding: 10px 20px;' );
			}
		} else if ( isDev ) {
			console.log( `%c cef::${ event } does not exist`, 'color: red; font-weight: 700;' );
		}
	};

	static stopAddingHandlers = ( target: string ): void => {
		for ( let i = 0; i < eventsInMemory.length; i++ ) {
			if ( eventsInMemory[ i ].target === target ) {
				if ( isDev ) {
					console.log( `%c cef::${ eventsInMemory[ i ].target }:${ eventsInMemory[ i ].name } loaded`, 'color: yellow; font-weight: 700;' );
				}
			}
		}

		if ( isDev ) {
			console.log( `%c ${ target } events loaded`, 'background: green; color: black; padding: 10px 40px; text-align: center; font-weight: 700;' );
		}

		mp.trigger( 'client::eventManager', `client::${ target }:ready` );

		if ( target === 'app' ) {
			if ( isDev ) {
				console.log( '%c all events loaded', 'background: green; color: black; padding: 10px 40px; text-align: center; font-weight: 700;' );
			}
		}
	};

	static removeTargetHandlers = ( eventTarget: string, bool: boolean = false ): void => {
		const events = eventsInMemory.filter( ( el ) => el.target === eventTarget );

		for ( let i = 0; i < events.length; i++ ) {
			eventsInMemory.splice(
				eventsInMemory.findIndex( ( el ) => el.id === events[ i ].id ),
				1
			);
			if ( isDev ) {
				console.log( `%c unsubscribe from cef::${ events[ i ].target }:${ events[ i ].name }`, 'color: red; font-weight: 700;' );
			}
		}

		if ( isDev ) {
			if ( bool ) {
				console.log( 'remaining events: ', eventsInMemory );
			}
		}
	};

	static emitServer = ( eventTarget: string, eventName: string, ...args: any[] ): void => {
		if ( typeof eventTarget !== 'string' || typeof eventName !== 'string' ) {
			throw new Error( 'event address must be a string' );
		}

		const event = `${ eventTarget }:${ eventName }`;
		//@ts-ignore
		rpc.callServer( 'executeServer', { event, data: JSON.stringify( args ) } )

		if ( isDev ) {
			console.log( `emitted (server): ${ event }\n`, ...args );
		}
	};

	static emitClient = ( eventTarget: string, eventName: string, ...args: any[] ): void => {
		if ( typeof eventTarget !== 'string' || typeof eventName !== 'string' ) {
			throw new Error( 'event address must be a string' );
		}

		const event = `${ eventTarget }:${ eventName }`;
		//@ts-ignore
		rpc.callClient( 'executeClient', { event, data: JSON.stringify( args ) } )

		if ( isDev ) {
			console.log( `emitted (client): ${ event }\n`, ...args );
		}
	};
}

export default EventManager;