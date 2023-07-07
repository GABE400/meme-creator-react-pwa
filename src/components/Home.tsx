import { Box, Container, Skeleton, Typography } from "@mui/material";
import HeroText from "./HeroText";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Home.css";
import { useEffect, useState } from "react";
import { Meme, TrendingMeme, useApi } from "../hooks/useApi";
import { Autoplay, Pagination } from "swiper/modules";
import MemeSelector from "./MemeSelector";
import { createSearchParams, useNavigate } from "react-router-dom";

const Home = () => {
  const { getTrending } = useApi();
  const [memes, setMemes] = useState<TrendingMeme[]>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMemes = async () => {
      const results = await getTrending();
      console.log("Home data: ", results);
      setMemes(results);
      setLoading(false);
    };
    loadMemes();
  }, [getTrending]);

  const memeSelected = (meme: Meme) => {
    navigate({
      pathname: "create",
      search: createSearchParams({
        meme: meme.name,
      }).toString(),
    });
  };

  return (
    <>
      <HeroText text='Discover the Best Memes' />

      <Container maxWidth='md' sx={{ mt: 8, mb: 8, display: "flex" }}>
        <Typography>
          Our meme creation platform offers a wide range of templates, images,
          and editing tools, empowering users to create memes that are unique
          and share-worthy. Whether you're a beginner or an experienced memer,
          Rapid MemeMaster provides a seamless experience for crafting hilarious
          and relatable content. Our intuitive drag-and-drop interface allows
          you to effortlessly combine images, text, and effects to create memes
          that resonate with your audience.
        </Typography>
      </Container>

      <Container maxWidth='md' sx={{ mt: 8, display: "flex", height: "50vh" }}>
        {loading && (
          <Skeleton
            variant='rectangular'
            width={"100%"}
            height={"100%"}
          ></Skeleton>
        )}

        {!loading && (
          <Swiper
            pagination={true}
            autoplay={true}
            modules={[Pagination, Autoplay]}
          >
            {memes?.map((meme) => (
              <SwiperSlide key={meme.title}>
                <img src={meme.url} alt='Meme' />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
      <Box sx={{ mt: 8, mb: 8 }}>
        <MemeSelector onSelect={(meme) => memeSelected(meme)} />
      </Box>
    </>
  );
};

export default Home;
