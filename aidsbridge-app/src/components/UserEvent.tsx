// ProfileEvents.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { getAllEvents } from '../store/events-slice';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectCurrentUser } from "../store/account-slice";


const ProfileEvents = () => {
    const events = useSelector(getAllEvents());
    const user = useSelector(selectCurrentUser);

    return (
        <div>
            {events.map((event) => (
                user?.userName === event.creator && (
                    <Accordion key={event._id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`event-panel-content-${event._id}`}
                        id={`event-panel-header-${event._id}`}
                    >
                        <Typography>{event.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography paragraph>{event.content}</Typography>
                        
                    </AccordionDetails>
                </Accordion>
                )
            ))}
        </div>
    );
};

export default ProfileEvents;
