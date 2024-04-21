import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import AccordionActions from '@mui/material/AccordionActions';
import { Event } from '../models/event';
import { useEffect } from 'react';
import { getBackgroundStyle } from '../components/BackgroundStyle';
import image from "../assets/event.jpg";
import EventPageArticle from '../components/eventpage-article';
import CreateEventForm from '../components/CreateEventform'; 
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

export default function EventsAccordion() {
    const [events, setEvents] = React.useState<Array<Event>>([]);

    useEffect(() => {
        // Fetch events from the backend server
        fetch('http://localhost:3000/aidsbridge/events')
          .then(response => response.json())
          .then(data => setEvents(data))
          .catch(error => console.error('Error fetching events:', error));
      }, []);

    return (
      <ThemeProvider theme={theme}>
      <>
        <div style={getBackgroundStyle(image)}>
          <h1 style={{textAlign: 'center'}}>
            Unite in the Fight: 
            <br />Join the Movement Against AIDS
          </h1>
        </div>
        <EventPageArticle />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px', marginTop: '20px' }}>
          <CreateEventForm />
        </div>
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          {events.map(event => (
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
                  Event Content
                </Typography>
                <Typography paragraph>{event.content}</Typography>
                <Typography variant="subtitle1" component="h2">
                  Attendees
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
