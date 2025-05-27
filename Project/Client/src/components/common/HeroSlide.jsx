import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { routesGen } from "../../routes/routes";
import uiConfigs from "../../configs/ui.configs";
import CircularRate from "./CircularRate";
import genreApi from "../../api/modules/genre.api";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import mediaApi from "../../api/modules/media.api";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) {
        setMovies(response.results);
      }
      if (error) {
        toast.error(error.message);
      }
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await genreApi.getList({ mediaType });
      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (error) {
        toast.error(error.message);
        setGlobalLoading(false);
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          color: "primary.contrastText",
          "&::before": {
            content: '""',
            width: "100%",
            height: "30%",
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 2,
            pointerEvents: "none",
            ...uiConfigs.style.gradientBgImage[theme.palette.mode],
          },
        }}
      >
        <Swiper
          grabCursor={true}
          loop={true}
          modules={[Autoplay]}
          style={{ width: "100%", height: "max-content" }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  paddingTop: {
                    xs: "130%",
                    sm: "80%",
                    md: "60%",
                    lg: "45%",
                  },
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundImage: `url(${tmdbConfigs.backdropPath(
                    movie.backdrop_path || movie.poster_path
                  )})`,
                }}
              ></Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default HeroSlide;
