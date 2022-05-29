const { schema, denormalize } = normalizr;

const author = new schema.Entity(
    'author',
    {},
    { idAttribute: 'email' }
);

const msg = new schema.Entity(
    'message',
    {},
    { idAttribute: '_id' }
);

export const finalSchema = new schema.Array(msg);

export const denormalizeData = (data) => {
    const denormalizedData = denormalize(data.resutl, finalSchema, data.entities);

    return denormalizedData;
};