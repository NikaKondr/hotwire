/// <reference types="react-scripts" />

declare module '*.style.scss' {
    const classes: { readonly [ key: string ]: string };
    export default classes;
}