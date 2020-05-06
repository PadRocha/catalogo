'use strict'

/*------------------------------------------------------------------*/
// Modelo de image.ts
/*------------------------------------------------------------------*/

export class Image {
    constructor(
        public idN: number,
        public img: string,
        public publicId: string,
        public status: number
    ) { }
};