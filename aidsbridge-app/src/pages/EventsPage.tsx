import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useTranslation } from "react-i18next";

import { loadEvents, getAllEvents } from "../store/events-slice";
import { getEvents } from "../services/events-service";
import { selectCurrentUser } from "../store/account-slice";
import EventPageArticle from "../components/eventpage-article";
import CreateEventForm from "../components/CreateEventform";
import { getBackgroundStyle } from "../components/BackgroundStyle";
import image from "../assets/event.jpg";
import theme from "../theme";
import { Event, EventPerson } from "../models/event";

const CustomButton = styled(Button)(({ theme }) => ({
  marginBottom: "10px",
  textAlign: "left",
  backgroundColor: theme.palette.grey[300],
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.grey[400],
  },
}));

const CustomCard = styled(Card)(({ theme }) => ({
  padding: "20px",
  boxShadow: theme.shadows[3],
}));

export default function EventsAccordion() {
  const dispatch = useDispatch();
  const aidsEvents = useSelector(getAllEvents());
  const { t } = useTranslation("common");
  const user = useSelector(selectCurrentUser);
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);

  const handleJoinEvent = async (eventId: string) => {
    if (!user) {
      alert("Please log in to join the event.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/aidsbridge/events/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            person: {
              peopleName: user.userName,
              accountId: user.accountId,
            },
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to join the event");
      }
      alert("You have joined the event successfully!");
    } catch (error) {
      console.error("Error joining event:", error);
      alert("Error joining the event.");
    }
  };

  React.useEffect(() => {
    getEvents().then((events) => {
      dispatch(loadEvents(events));
      if (events.length > 0) {
        setSelectedEvent(events[0]);
      }
    });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div style={getBackgroundStyle(image)}>
        <h1 style={{ textAlign: "center" }}>
          {t("event.header.line")}
          <br />
          {t("event.header.line2")}
        </h1>
      </div>
      <EventPageArticle />
      <div style={{ marginLeft: "100px" }}>
        <CreateEventForm />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            padding: "20px",
          }}
        >
          <div style={{ width: "30%", marginRight: "20px" }}>
            {aidsEvents.map((event) => (
              <CustomButton
                fullWidth
                variant="contained"
                key={event._id}
                onClick={() => setSelectedEvent(event)}
              >
                {event.title}
              </CustomButton>
            ))}
          </div>
          <div style={{ width: "70%" }}>
            {selectedEvent && (
              <CustomCard>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {selectedEvent.title}
                  </Typography>
                  <Typography variant="subtitle1" component="h2">
                    {t("event.card.content")}
                  </Typography>
                  <Typography paragraph>{selectedEvent.content}</Typography>
                  <Typography variant="subtitle1" component="h2">
                    {t("event.card.attendees")}
                  </Typography>
                  <ul>
                    <li>{selectedEvent.creator}</li>
                    {selectedEvent.people.map((person) => (
                      <li key={person.accountId}>{person.peopleName}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleJoinEvent(selectedEvent._id)}
                    style={{ marginTop: "10px" }}
                  >
                    Join
                  </Button>
                </CardActions>
              </CustomCard>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
