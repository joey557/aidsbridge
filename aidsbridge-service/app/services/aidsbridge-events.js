import Events from '../models/events.js';

export const readEvents = async () => {
    return await Events.find({}).exec();
}

export const saveEvents = async (event) => {
    const newEvent = new Events(event);
    return await newEvent.save();
}

export const removeEvents = async (title) => {
    return await Events.deleteOne({ title: title }).exec();
}

export const updateEvents = async (title, content) => {
    return await Events.updateOne({ title: title }, content).exec();
}

export const filterEvents = async (filterOptions) => {
    const { keyword, startDate, endDate } = filterOptions;
    let query = {};

    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: 'i' } },  // 标题中搜索关键词
            { content: { $regex: keyword, $options: 'i' } } // 内容中搜索关键词
        ];
    }

    if (startDate || endDate) {
        query.eventsDate = {};
        if (startDate) {
            query.eventsDate.$gte = new Date(startDate);
        }
        if (endDate) {
            query.eventsDate.$lte = new Date(endDate);
        }
    }

    return await Articles.find(query).exec();
};