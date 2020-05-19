import { model, Schema, PaginateModel, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { IKey } from '../models/key';

export interface ILine extends Document {
    identifier: string,
    name: string,
    started: Date,
    ended: Date,
    countKeys: number,
    keys: Array<IKey>
}

const lineSchema = new Schema({
    identifier: {
        type: String,
        unique: true,
        trim: true,
        minlength: 6,
        maxlength: 6,
        uppercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    started: {
        type: Date,
        default: Date.now,
        required: true
    },
    ended: {
        type: Date
    }
});

lineSchema.plugin(mongoosePaginate);

/*------------------------------------------------------------------*/

interface LineModel<T extends Document> extends PaginateModel<T> { };

export default model<ILine>('Line', lineSchema) as LineModel<ILine>;