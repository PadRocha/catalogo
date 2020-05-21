'use strict'

export interface IImage {
    readonly idN: number,
    readonly publicId: string | null,
    readonly img: string | null,
    readonly status: number
}

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