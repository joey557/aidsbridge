import {search} from './api-services';
import {Article} from '../models/article';

const articlePath = 'aidsbridge/articles';

export const getArticles = async (params = {}): Promise<Article[]> => {
    return search<Article>(articlePath, params);
};
