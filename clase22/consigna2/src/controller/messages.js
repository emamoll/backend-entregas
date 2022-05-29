import * as util from 'util';
import { normalize, schema } from 'normalizr';
import { MsgModel } from '../models/messages';

export const addMsg = async (msg) => {
    let savedMsg = await MsgModel.create(msg);
    return savedMsg;
};

const author = new schema.Entity(
    'author', 
    {}, 
    { idAttribute: 'email' }
);

const msg = new schema.Entity(
    'message',
    { author: author },
    { idAttribute: '_id' }
);

const messagesSchema = new schema.Array(msg);

export const getAllMsg = async () => {
    try {
        const msgOriginalData = await MsgModel.find().lean();

        let normalizedMsg = normalize(msgOriginalData, messagesSchema);

        console.log(util.inspect(normalizedMsg, true, 3, true));
        return normalizedMsg; 
    } catch (err) {
        console.log(`Error => ${err}`);
    };
};
