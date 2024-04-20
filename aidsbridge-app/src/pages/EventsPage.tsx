import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import AccordionActions from '@mui/material/AccordionActions';
import { Events } from '../models/events';
import { useEffect } from 'react';

// Sample data, you might typically fetch this from an API
// const events = [
//   {
//     id: 1,
//     title: "World AIDS Day Conference 2024",
//     content: "Join us for a comprehensive conference on the latest advancements in HIV research, treatment, and management. This event brings together healthcare professionals, researchers, and community advocates to share knowledge and strategies for combating HIV/AIDS globally.",
//     people: [
//       { peopleName: "Dr. Jane Smith", accountId: "prof123" },
//       { peopleName: "Dr. Robert Lee", accountId: "prof456" },
//     ],
//     createdDate: "2024-04-01T00:00:00Z",
//     eventsDate: "2024-12-01T09:00:00Z"
//   },
//   {
//     id: 2,
//     title: "Local Community HIV Testing Drive",
//     content: "We are hosting a free HIV testing drive for the local community to promote early detection and awareness. The event will include educational sessions on prevention and treatment options, and will provide support resources for those affected.",
//     people: [
//       { peopleName: "Nurse Emily Doe", accountId: "nurse789" },
//       { peopleName: "Counselor John Roe", accountId: "couns101" },
//     ],
//     createdDate: "2024-04-15T00:00:00Z",
//     eventsDate: "2024-05-20T10:00:00Z"
//   }
// ];

export default function EventsAccordion() {
    const [events, setEvents] = React.useState<Array<Events>>([]);

    useEffect(() => {
        // Fetch articles from the backend server
        fetch('http://localhost:3000/aidsbridge/events')
          .then(response => response.json())
          .then(data => setEvents(data))
          .catch(error => console.error('Error fetching articles:', error));
      }, []);

  return (
    <div style={{ marginTop: '100px', textAlign: 'center'}}>
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
            {/* <Button color="secondary">Cancel</Button> */}
            <Button color="primary" variant="contained">Join</Button>
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
}
