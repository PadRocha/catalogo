'use strict'

import { Image } from './image';

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