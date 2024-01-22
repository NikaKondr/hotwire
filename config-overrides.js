const { configPaths } = require( 'react-app-rewire-alias' )
const { aliasDangerous } = require( 'react-app-rewire-alias/lib/aliasDangerous' );

module.exports = function override ( config ) {
    config.entry = {
        main: [
            require.resolve( './pre-load.ts' ),
        ]
    };
    aliasDangerous( {
        ...configPaths( './tsconfig.paths.json' )
    } )( config )

    return config;
}