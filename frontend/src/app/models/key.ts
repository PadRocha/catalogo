'use strict'

import { Image, IImage } from './image';



export interface IKey extends Document {
    readonly _id: string;
    readonly code: string;
    readonly line: string;
    readonly desc: string;
    readonly image: Array<IImage>;
    readonly createdAt: Date;
}

export interface Dkey {
    data: IKey
}

export interface AKey {
    data: Array<IKey>
}

/*------------------------------------------------------------------*/
// Modelo de key.ts
/*------------------------------------------------------------------*/

export class Key {
    constructor(
        public _id: string,
        public code: string,
        public line: string,
        public desc: string,
        public image: Array<Image>,
        public config: boolean
    ) { }
};