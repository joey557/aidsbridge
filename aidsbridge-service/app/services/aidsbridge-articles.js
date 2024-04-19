import Articles from '../models/articles.js';

export const read = async () => {
    return await Articles.find({}).exec();
}

export const save = async (articles) => {
    const newArticle = new Articles(articles);
    return await newArticle.save();
}

export const remove = async (title) => {
    return await Articles.deleteOne({ title: title }).exec();
}

export const update = async (title, content) => {
    return await Articles.updateOne({ title: title }, content).exec();
}