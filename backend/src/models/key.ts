import { model, Schema, PaginateModel, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface IImage {
    idN: number,
    publicId: string | null,
    img: string | Buffer | null,
    status: number
}

export interface IKey extends Document {
    code: string;
    line: string;
    desc: string;
    image: Array<IImage>;
    config: boolean;
    createdAt: Date;
}

const keySchema = new Schema({
    code: {
        type: String,
        trim: true,
        maxlength: 4,
        uppercase: true,
        required: true
    },
    line: {
        type: String,
        ref: 'Line',
        required: true
    },
    desc: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: [{
            idN: {
                type: Number,
                required: true
            },
            publicId: {
                type: String,
                default: null
            },
            img: {
                type: String,
                default: null
            },
            status: {
                type: Number,
                default: 0,
                min: 0,
                max: 5,
                required: true
            }
        }],
        _id: false,
        idN: true
    },
    conf: {
        type: Boolean,
        default: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

keySchema.index({ code: 1, line: 1 }, { unique: true });
/*------------------------------------------------------------------*/

keySchema.pre<IKey>('save', function (next: Function) {
    const key = this;
    const length = key.code.length;
    for (let i = 0; i < (4 - length); i++) key.code = '0' + key.code;
    return next();
});

keySchema.plugin(mongoosePaginate);

/*------------------------------------------------------------------*/

interface KeyModel<IKey extends Document> extends PaginateModel<IKey> { };

export default model<IKey>('Key', keySchema) as KeyModel<IKey>;