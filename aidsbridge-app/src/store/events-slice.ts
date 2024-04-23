import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Event } from "../models/event";
import { AppState } from ".";
// Create a slice for event-related functionalities.
export type EventsState = Event[];
const initiateState: EventsState = [];
export const eventsSlice = createSlice({
    name: 'events',
    initialState: initiateState,
    reducers: {
        loadEvents: (state: EventsState, action: PayloadAction<EventsState>) => {
            return [...action.payload];
        }
    }
});

export const { loadEvents } = eventsSlice.actions;

export const getAllEvents = (): ((state: AppState) => EventsState) => {
    return (state: AppState) => state.events;
}

export default eventsSlice.reducer;