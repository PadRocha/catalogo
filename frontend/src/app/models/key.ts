'use strict'

import { Image, IImage } from './image';
import { PaginateResult } from './paged';

export interface Ikey {
    readonly _id: string;
    readonly code: string;
    readonly line: string;
    readonly desc: string;
    readonly image: Array<IImage>;
    readonly createdAt: Date;
    readonly config: boolean;
}

export interface Dkey extends Promise<Ikey> {
    data: Ikey
}

export interface Akey {
    data: Array<Ikey>;
}

export interface DAkey {
    data: PaginateResult<Ikey>
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