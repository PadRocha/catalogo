/*------------------------------------------------------------------*/
// Modelo de user.ts
/*------------------------------------------------------------------*/

export class User {
    constructor(
        public _id: String,
        public nickname: String,
        public password: String,
        public role: String
    ) { }
};