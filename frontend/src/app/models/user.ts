'use strict'

/*------------------------------------------------------------------*/
// Modelo de user.ts
/*------------------------------------------------------------------*/

export class User {
    constructor(
        public _id: string,
        public nickname: string,
        public password: string,
        public role: string
    ) { }
};