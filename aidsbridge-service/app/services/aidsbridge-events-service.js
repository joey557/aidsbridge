import Events from '../models/events.js';

export const readEvents = async () => {
    return await Events.find({}).exec();
}

export const saveEvents = async (event) => {
    const newEvent = new Events(event);
    return await newEvent.save();
}

export const removeEvents = async (id) => {
    return await Events.findByIdAndDelete(id).exec();
}

export const updateEvents = async (id, eventData) => {
    return await Events.findByIdAndUpdate(id, eventData, {new: true}).exec();
}

export const filterEvents = async (filterOptions) => {
    const { keyword, startDate, endDate } = filterOptions;
    let query = {};

    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: 'i' } },
            { content: { $regex: keyword, $options: 'i' } }
        ];
    }

    if (startDate || endEventDate) {
        query.eventsDate = {};
        if (startDate) {
            query.eventsDate.$gte = new Date(startDate);
        }
        if (endDate) {
            query.eventsDate.$lte = new Date(endDate);
        }
    }

    return await Events.find(query).exec();
};