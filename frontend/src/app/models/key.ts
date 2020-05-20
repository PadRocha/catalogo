'use strict'

import { Image } from './image';

export interface IImage {
    idN: number,
    publicId: string | null,
    img: string | null,
    status: number
}

export interface IKey extends Document {
    code: string;
    line: string;
    desc: string;
    image: Array<IImage>;
    // readonly config: boolean;
    createdAt: Date;
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