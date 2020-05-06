'use strict'

import { Image } from './image';

/*------------------------------------------------------------------*/
// Modelo de key.ts
/*------------------------------------------------------------------*/

export class Key {
    constructor(
        public identifier: String,
        public code: String,
        public line: String,
        public desc: String,
        public image: Array<Image>,
        public config: Boolean
    ) { }
};