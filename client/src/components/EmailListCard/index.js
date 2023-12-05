import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { TextField, Button } from "@mui/material";
import Container from "@mui/material/Container";

const EmailCard = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
  });
  const [btnText, setBtnText] = useState("Submit");
  const form = useRef();

  const handleChange = (e) => {
    e.preventDefault();
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_qurc38s",
        "template_yw9o3uk",
        form.current,
        "lD9pNTmTHerIg5bws"
      )
      .then(
        (result) => {
          setBtnText("Signed up for Email List!");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        (error) => {
          console.log(error.text);
          setBtnText("Error!");
        }
      );
  };

  return (
    <Container sx={{mt: 5}}>
      <form ref={form} onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          className="form-control"
          placeholder="Your Name"
          defaultValue={formState.name}
          onChange={handleChange}
          fullWidth
          sx={{mb: 1}}
        />
        <TextField
          type="email"
          name="email"
          className="form-control"
          placeholder="YourEmail@email.com"
          defaultValue={formState.email}
          onChange={handleChange}
          fullWidth
          sx={{mb: 1}}
        />
        <Button
          variant="contained"
          type="submit"
          className="btn btn-primary"
          fullWidth
        >
          {btnText}
        </Button>
      </form>
    </Container>
  );
};

export default EmailCard;
