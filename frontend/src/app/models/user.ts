'use strict'

/*------------------------------------------------------------------*/
// Modelo de user.ts
/*------------------------------------------------------------------*/

export class User {
    constructor(
        public identifier: String,
        public nickname: String,
        public password: String,
        public role: String
    ) { }
};