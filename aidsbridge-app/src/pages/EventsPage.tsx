import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, styled } from "@mui/material/styles";
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import AccordionActions from '@mui/material/AccordionActions';
import { useTranslation } from 'react-i18next';

import { loadEvents, getAllEvents } from '../store/events-slice';
import { getEvents } from '../services/events-service';
import { selectCurrentUser } from '../store/account-slice';
import EventPageArticle from '../components/eventpage-article';
import CreateEventForm from '../components/CreateEventform';
import { getBackgroundStyle } from '../components/BackgroundStyle';
import image from "../assets/event.jpg";
import theme from "../theme";

const CustomAccordion = styled(MuiAccordion)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],  
  margin: '10px',
  boxShadow: theme.shadows[2],
  '&:before': {  
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: '10px 10px',
  },
  minHeight: 48,
  '&:not(.Mui-expanded)': {
    minHeight: 48,
  },
}));

export default function EventsAccordion() {
    const dispatch = useDispatch();
    const aidsEvents = useSelector(getAllEvents());
    const { t } = useTranslation('common');
    const user = useSelector(selectCurrentUser);

    React.useEffect(() => {
      getEvents().then(events => {
        dispatch(loadEvents(events));
      });
    }, [dispatch]);

    return (
    <ThemeProvider theme={theme}>
      <div style={getBackgroundStyle(image)}>
        <h1 style={{ textAlign: 'center' }}>
          {t('event.header.line')}
          <br />{t('event.header.line2')}
        </h1>
      </div>
      <div style={{ marginLeft: '100px' }}>
        <div>
          <CreateEventForm />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gridGap: '20px',
          padding: '20px'
        }}>
          {aidsEvents.map(event => (
            <CustomAccordion key={event._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${event._id}-content`}
                id={`panel${event._id}-header`}
              >
                <Typography variant="subtitle1" component="h2">
                  {event.title}
                </Typography>
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
              <AccordionActions style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                <Button color="primary" variant="contained">Join</Button>
              </AccordionActions>
            </CustomAccordion>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}