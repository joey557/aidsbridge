import {search} from './api-services';
import {Event} from '../models/event';

const eventPath = 'aidsbridge/events';

export const getEvents = async (params = {}): Promise<Event[]> => {
    return search<Event>(eventPath, params);
}