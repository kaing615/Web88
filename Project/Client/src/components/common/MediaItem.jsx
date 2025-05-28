import { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import { Link } from "react-router-dom";
import favoriteUtils from "../../utils/favorite.utils";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CircularRate from "./CircularRate";

// Lấy url poster, có fallback
const getPosterUrl = (posterPath) => {
  if (!posterPath) return "/fallback.jpg";
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};

const MediaItem = ({ media, mediaType }) => {
  const { listFavorites } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);
    setPosterPath(
      media.poster_path ||
        media.backdrop_path ||
        media.profile_path ||
        media.mediaPoster
    );

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    } else {
      setReleaseDate(
        media.first_air_date && media.first_air_date.split("-")[0]
      );
    }
    setRate(media.vote_average || media.imdbRate || media.mediaRate);
  }, [media, mediaType]);

  // Style đẹp hơn
  return (
    <Link
      to={
        mediaType !== "people"
          ? routesGen.mediaDetail(mediaType, media.id || media.mediaId)
          : routesGen.person(media.id)
      }
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(getPosterUrl(posterPath)),
          paddingTop: "160%",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
          transition: "transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.05) translateY(-4px)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.32)",
          },
          "&:hover .media-info": {
            opacity: 1,
            bottom: 0,
          },
          "&:hover .media-backdrop, &:hover .media-play-btn": {
            opacity: 1,
          },
          color: "primary.contrastText",
        }}
      >
        {/* Icon yêu thích */}
        {mediaType !== "people" &&
          favoriteUtils.check({ listFavorites, mediaId: media.id }) && (
            <FavoriteIcon
              color="error"
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: "2rem",
                zIndex: 2,
                filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.25))",
              }}
            />
          )}

        {/* Overlay backdrop */}
        <Box
          className="media-backdrop"
          sx={{
            opacity: 0,
            transition: "opacity 0.35s",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            background:
              "linear-gradient(to top, rgba(20,20,25,0.92) 70%, rgba(0,0,0,0) 100%)",
            zIndex: 1,
          }}
        />

        {/* Nút Play */}
        <IconButton
          className="media-play-btn"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            bgcolor: "rgba(0,201,167,0.85)", // xanh ngọc trong suốt
            color: "#fff",
            opacity: 0,
            zIndex: 2,
            boxShadow: "0 0 20px 2px #00C9A799, 0 2px 30px 6px #1DE9B666",
            transition:
              "opacity 0.3s, filter 0.4s, transform 0.33s cubic-bezier(.8,.2,.2,1.2)",
            "&:hover": {
              bgcolor: "#fff",
              color: "#00C9A7",
              filter: "drop-shadow(0 0 32px #00C9A7cc) brightness(1.20)",
            },
          }}
        >
          <PlayArrowIcon sx={{ fontSize: 40 }} />
        </IconButton>

        {/* Thông tin phim */}
        <Box
          className="media-info"
          sx={{
            position: "absolute",
            left: 0,
            bottom: "-20px",
            width: "100%",
            opacity: 0,
            zIndex: 2,
            padding: "18px 12px 12px 12px",
            background: "rgba(16,18,24,0.84)",
            color: "#fff",
            transition: "all 0.4s cubic-bezier(.7,.3,.1,1)",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="subtitle1" noWrap fontWeight="bold">
            {title}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            {rate && <CircularRate value={rate} />}
            {releaseDate && (
              <Typography variant="caption" sx={{ color: "#ccc" }}>
                {releaseDate}
              </Typography>
            )}
          </Box>
        </Box>

        {mediaType === "people" && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "max-content",
              bottom: 0,
              padding: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          >
            <Typography sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
              {media.name}
            </Typography>
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default MediaItem;
