'use strict'

/*------------------------------------------------------------------*/
// Modelo de key.ts
/*------------------------------------------------------------------*/

export class Key {
    constructor(
        public _id: String,
        public code: String,
        public line: String,
        public desc: String,
        public image: Array<Object>
    ) { }
};