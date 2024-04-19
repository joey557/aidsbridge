import Articles from '../models/articles.js';

export const readArticles = async () => {
    return await Articles.find({}).exec();
}

export const saveArticles = async (articles) => {
    const newArticle = new Articles(articles);
    return await newArticle.save();
}

export const removeArticles = async (title) => {
    return await Articles.deleteOne({ title: title }).exec();
}

export const updateArticles = async (title, content) => {
    return await Articles.updateOne({ title: title }, content).exec();
}

export const filterArticles = async (filterOptions) => {
    let query = {};

    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: 'i' } },
            { content: { $regex: keyword, $options: 'i' } }
        ];
    }

    return await Articles.find(query).exec();
};