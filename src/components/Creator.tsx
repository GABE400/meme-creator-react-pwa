import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import HeroText from "./HeroText";
import MemeSelector from "./MemeSelector";
import { Meme, useApi } from "../hooks/useApi";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Close, DownloadOutlined } from "@mui/icons-material";

const Creator = () => {
  const { createMeme } = useApi();
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState<string>();
  const [top, setTop] = useState("");
  const [bottom, setBottom] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>();

  useEffect(() => {
    const activeMeme = searchParams.get("meme");
    setSelected(activeMeme || "10-Guy");
  }, [searchParams]);

  const memeSelected = (meme: Meme) => {
    setSelected(meme.name);
  };

  const doCreateMeme = async () => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const result = await createMeme(top, bottom, selected!);
    setLoading(false);
    setResult(result);
    console.log("result: ", result);
    setShowModal(true);
  };

  const startDownload = () => {
    const element = document.createElement("a");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    element.href = result!;
    element.download = "image.jpg";
    element.click();
  };

  return (
    <>
      <Container maxWidth='md' sx={{ mt: 10, mb: 8 }}>
        <Typography>
          Rapid MemeMaster is home to a diverse team of meme enthusiasts,
          designers, and content creators who are passionate about spreading
          laughter across the internet. We believe that memes have the ability
          to bridge gaps, break down barriers, and bring people together,
          regardless of their backgrounds or interests. Our team works
          tirelessly to ensure that our meme creation tools are user-friendly,
          accessible, and packed with features to unleash your creativity.
        </Typography>
      </Container>

      <HeroText text='Create Your Meme' />

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Container maxWidth='sm' sx={{ textAlign: "center" }}>
          <Stack spacing={2} p={{ xs: 2, md: 4, color: "#333" }} bgcolor='#fff'>
            <Typography variant='h4'>Grab Your Meme!</Typography>
            <Button
              fullWidth
              variant='contained'
              onClick={() => startDownload()}
              startIcon={<DownloadOutlined />}
            >
              Download Meme
            </Button>
            <img src={result} alt='Meme' />
            <Button onClick={() => setShowModal(false)}>
              <Close />
            </Button>
          </Stack>
        </Container>
      </Modal>

      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color='inherit'></CircularProgress>
      </Backdrop>
      <Box sx={{ mt: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={6} lg={8}>
            <Stack spacing={2} sx={{ background: "#fff", p: 5 }}>
              <FormControl>
                <TextField
                  placeholder='Top text'
                  onChange={(ev) => setTop(ev.target.value)}
                ></TextField>
              </FormControl>

              <FormControl>
                <TextField
                  placeholder='Bottom text'
                  onChange={(ev) => setBottom(ev.target.value)}
                ></TextField>
              </FormControl>

              <Button
                fullWidth
                variant='contained'
                size='large'
                onClick={() => doCreateMeme()}
                disabled={selected === ""}
              >
                Create Meme
              </Button>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={6}
            lg={4}
            sx={{ img: { width: "100%" } }}
          >
            <img src={`/img/${selected}.jpeg`} alt='create meme'></img>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 8, mb: 8 }}>
        <MemeSelector
          onSelect={(meme) => memeSelected(meme)}
          activeMeme={selected}
        />
      </Box>
    </>
  );
};

export default Creator;
