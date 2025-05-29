import React from "react";
import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import { Box } from "@mui/material";
import MediaSlide from "../components/common/MediaSlide";
import favoriteApi from "../api/modules/favorite.api";
import { useDispatch } from "react-redux";
import { setListFavorites } from "../redux/features/userSlice";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();

  // Sau khi đăng nhập thành công hoặc vào trang home/profile
  useEffect(() => {
    const fetchFavorites = async () => {
      const { response } = await favoriteApi.getList();
      if (response) {
        dispatch(setListFavorites(response.data));
      }
    };
    fetchFavorites();
  }, [dispatch]);
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

        <Container header="Popular Series">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header="Top Rated Series">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
