import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import AccordionActions from '@mui/material/AccordionActions';
//import { Event } from '../models/event';
import { useEffect } from 'react';
import { getBackgroundStyle } from '../components/BackgroundStyle';
import image from "../assets/event.jpg";
import EventPageArticle from '../components/eventpage-article';
import CreateEventForm from '../components/CreateEventform'; 
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { useTranslation } from 'react-i18next';

import { AppDispatch } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents, getAllEvents } from '../store/events-slice';
import { getEvents } from '../services/events-service';

export default function EventsAccordion() {
    //const [events, setEvents] = React.useState<Array<Event>>([]);

    const dispatch = useDispatch<AppDispatch>();
    const aidsEvents = useSelector(getAllEvents());
    const { t } = useTranslation('common');
    useEffect(() => {
      getEvents().then((events) => {
        dispatch(loadEvents(events))
      })
    })

    // useEffect(() => {
    //     // Fetch events from the backend server
    //     fetch('http://localhost:3000/aidsbridge/events')
    //       .then(response => response.json())
    //       .then(data => setEvents(data))
    //       .catch(error => console.error('Error fetching events:', error));
    //   }, []);

    return (
      <ThemeProvider theme={theme}>
      <>
        <div style={getBackgroundStyle(image)}>
          <h1 style={{textAlign: 'center'}}>
            {t('event.header.line')}
            <br />{t('event.header.line2')}
          </h1>
        </div>
        <EventPageArticle />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px', marginTop: '20px' }}>
          <CreateEventForm />
        </div>
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          {aidsEvents.map(event => (
            <Accordion key={event._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${event._id}-content`}
                id={`panel${event._id}-header`}
              >
                {event.title}
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1" component="h2">
                  {t('event.card.content')}
                </Typography>
                <Typography paragraph>{event.content}</Typography>
                <Typography variant="subtitle1" component="h2">
                  {t('event.card.attendees')}
                </Typography>
                <ul>
                  {event.people.map(person => (
                    <li key={person.accountId}>{person.peopleName}</li>
                  ))}
                </ul>
              </AccordionDetails>
              <AccordionActions>
                <Button color="primary" variant="contained">Join</Button>
              </AccordionActions>
            </Accordion>
          ))}
        </div>
      </>
      </ThemeProvider> 
    );
}
