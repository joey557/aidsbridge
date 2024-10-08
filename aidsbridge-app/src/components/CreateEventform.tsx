import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/account-slice";

//add event button on events page
export default function CreateEventForm() {
  const [open, setOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const [eventData, setEventData] = useState({
    title: "",
    content: "",
    creator: "",
    createdDate: new Date().toISOString().slice(0, 10),
    eventsDate: new Date().toISOString().slice(0, 10),
  });

  const handleOpen = () => {
    if (user === null) {
      alert("Please login to create an event.");
      return;
    } else {
      setEventData((prevState) => ({
        ...prevState,
        creator: user.userName, // Set creator from current user
      }));
      setOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setEventData({
      title: "",
      content: "",
      creator: "",
      createdDate: new Date().toISOString().slice(0, 10),
      eventsDate: new Date().toISOString().slice(0, 10),
    });
  };

  const handleSubmit = async () => {
    const { title, content, creator, createdDate, eventsDate } = eventData;
    try {
      console.log("Request Data:", eventData); // Print request data for debugging
      const response = await fetch(
        "https://aidsbridge-1.onrender.com/aidsbridge/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            creator,
            createdDate,
            eventsDate,
          }),
        }
      );

      if (response.ok) {
        alert("Event created successfully!");
        handleClose(); // Close the dialog and reset the form
      } else {
        const errorText = await response.text();
        alert(`Failed to create event: ${errorText}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event due to network error.");
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <AddIcon /> Add Event
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create a New Event</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            name="content"
            value={eventData.content}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Creator"
            type="text"
            fullWidth
            variant="outlined"
            name="creator"
            value={eventData.creator}
            onChange={handleInputChange}
            disabled // Disable this field to prevent user from changing it
          />
          <TextField
            margin="dense"
            label="Created Date"
            type="date"
            fullWidth
            variant="outlined"
            name="createdDate"
            value={eventData.createdDate}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Event Date"
            type="date"
            fullWidth
            variant="outlined"
            name="eventsDate"
            value={eventData.eventsDate}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
