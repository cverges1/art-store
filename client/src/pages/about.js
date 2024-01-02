import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Card sx={{ textAlign: "center" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          About The Artist
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ height: 300, width: 300, margin: "auto" }}
        image="/images/artist.JPG"
        title="Chris Verges"
      />
      <CardContent>
        <Typography sx={{ marginBottom: 2 }} variant="body2" color="text.secondary">
          Chris was born and is based out of Phoenix Arizona. He has always
          enjoyed making and viewing art but wasn't making more than the
          occasional doodle for several years. That changed in 2020 when the
          world was a strange place and everyone was staying inside. With extra
          time on his hands Chris decided to try and acquire an artistic skill
          that had eluded him his whole life, how to draw without a reference.
          This simple idea of trying to learn how to draw what is in your head
          and make it look believable reignited a love and passion for art in
          Chris and he has been pursuing this goal ever since.
        </Typography>
        <Typography sx={{ marginBottom: 2 }} variant="body2" color="text.secondary">
          As an avid hiker and lover of the outdoors, Chris mainly depicts
          landscapes, plants, animals, and all the beauty that nature has to
          offer. He does also enjoy challenging himself by creating portraits, making fan art of some of his favorite series
          such as Lord of the Rings or just by asking a friend "what should I draw?"
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Chris loves nothing more than to make his art for others. If you would like a piece made or have any questions, please{" "}
          <Link to={`/contact`} style={{ textDecoration: "underline", color: "inherit" }}>
            send a message
          </Link>
          .
        </Typography>
      </CardContent>
    </Card>
  );
}
