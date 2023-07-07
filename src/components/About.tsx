import { Container, Typography } from "@mui/material";
import HeroText from "./HeroText";

const About = () => {
  return (
    <>
      <HeroText text='About' />
      <Container maxWidth='md' sx={{ mt: 8, display: "flex" }}>
        <Typography>
          Welcome to Rapid MemeMaster, the ultimate meme creator company that
          brings joy and laughter to the digital world! At Rapid MemeMaster, we
          understand the power of memes and the incredible impact they have on
          internet culture. Our mission is to provide a platform for everyone to
          express their creativity and humor through memes.
        </Typography>
      </Container>
    </>
  );
};

export default About;
