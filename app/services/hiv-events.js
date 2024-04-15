import Events from '../models/events.js';

export const read = async () => {
    return await Events.find({}).exec();
}

export const save = async (event) => {
    const newEvent = new Events(event);
    return await newEvent.save();
}

export const remove = async (title) => {
    return await Events.deleteOne({ title: title }).exec();
}

export const update = async (title, content) => {
    return await Events.updateOne({ title: title }, content).exec();
}