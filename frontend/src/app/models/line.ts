'use strict'

import { Key } from './key';
import { PaginateResult } from './paged';

export interface Iline {
    readonly _id: string,
    readonly identifier: string,
    readonly name: string,
    readonly started: Date,
    readonly ended: Date,
    readonly countKeys: number,
    readonly keys?: Array<Key>
}

export interface Dline {
    data: Iline
}

export interface Aline {
    data: Array<Iline>
}

export interface DAline {
    data: PaginateResult<Iline>
}

/*------------------------------------------------------------------*/
// Modelo de line.ts
/*------------------------------------------------------------------*/

export class Line {
    constructor(
        public identifier: string,
        public name: string,
        public countKeys: number
    ) { }
};