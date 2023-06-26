import { FC, useEffect, useMemo, useState } from 'react';

import style from './hotwire.module.scss';

interface IColors {
    [ key: number ]: {
        id: number,
        color: string[]
    }
}

const HotWire: FC<{}> = () => {
    const [ result, setResult ] = useState( [] ),
        [ leftLine, setLeftLine ] = useState<string[]>( [] ),
        [ rightLine, setRightLine ] = useState<string[]>( [] );

    const colors: IColors = useMemo( () => ( {
        1: { id: 1, color: [ '#7E9570', '#2C6907' ] },
        2: { id: 2, color: [ '#1FFF1B', '#138511' ] },
        3: { id: 3, color: [ '#FFF732', '#A6A00A' ] },
        4: { id: 4, color: [ '#FF440A', '#A03C1D' ] },
        5: { id: 5, color: [ '#002343', '#6CB9FF' ] },
        6: { id: 6, color: [ '#7747FF', '#18005B' ] },
        7: { id: 7, color: [ '#FF3636', '#881616' ] },
    } ), [] )

    const shuffleArray = ( colors: IColors ): string[] => {
        return Object.keys( colors ).sort( () => Math.random() - 0.5 );
    };

    useEffect( () => {
        setLeftLine( shuffleArray( colors ) );
        setRightLine( shuffleArray( colors ) );
    }, [] )

    console.log( leftLine, rightLine )

    return <div className={style.main}>
        <div className={style.game}>
            <div className={style.gamefield}>
                <div className={style.line}>
                    {leftLine.map( ( el, idx ) => {
                        return <div key={idx} className={style.box}>
                            <div className={style.pin}></div>
                            <div className={style.wire} style={{ '--color1': colors[ +el ].color[ 0 ], '--color2': colors[ +el ].color[ 1 ] } as React.CSSProperties} ></div>
                        </div>
                    } )}
                </div>
                <div className={style.line}>
                    {rightLine.map( ( el, idx ) => {
                        return <div key={idx} className={style.box}>
                            <div className={style.pin}></div>
                            <div className={style.wire} style={{ '--color1': colors[ +el ].color[ 0 ], '--color2': colors[ +el ].color[ 1 ] } as React.CSSProperties} ></div>
                        </div>
                    } )}
                </div>
            </div>
        </div>
        <div className={style.help}>
            <div className={style.box}>
                <div className={style.btn}>ЛКМ</div>
                <span>Перетащить провод</span>
            </div>
            <div className={style.box}>
                <div className={style.btn}>Esc</div>
                <span>Отменить</span>
            </div>
        </div>
    </div>
}

export default HotWire;