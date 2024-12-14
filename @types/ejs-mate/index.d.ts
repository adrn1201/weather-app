declare module 'ejs-mate' {
    import { RequestHandler } from 'express';

    // Define the types you need here. This is a basic example.
    export function ejsMate(view: string, options?: object): RequestHandler;
    export default ejsMate;
}
