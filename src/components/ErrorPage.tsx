import { Container, Typography } from "@mui/material";
import HeroText from "./HeroText";
import Header from "./Header";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 10 }} maxWidth='lg'>
        <HeroText text='ERROR' />
        <Typography variant='h2'>404 - Not Your Meme</Typography>
      </Container>
    </>
  );
};

export default ErrorPage;
