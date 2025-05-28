import React from "react";
import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
import uiConfigs from "../configs/ui.configs";
import Container from '../components/common/Container'
import { Box } from "@mui/material";
import MediaSlide from "../components/common/MediaSlide";

const HomePage = () => {
  return (
    <>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />

      <Box
        marginTop={"-4rem"}
        sx={{
          ...uiConfigs.style.mainContent,
        }}
      >
         <Container header="Popular Movies">
            <MediaSlide 
              mediaType={tmdbConfigs.mediaType.movie} 
              mediaCategory={tmdbConfigs.mediaCategory.popular} 
            />
         </Container>

         <Container header="Top Rated Movies">
            <MediaSlide 
              mediaType={tmdbConfigs.mediaType.movie} 
              mediaCategory={tmdbConfigs.mediaCategory.top_rated} 
            />
         </Container>
      </Box>
    </>
  );
};

export default HomePage;
