import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { useSelector } from "react-redux"
import tmdbConfigs from "../../api/configs/tmdb.configs"
import uiConfigs from "../../configs/ui.configs"
import { routesGen } from "../../routes/routes"
import { Link } from "react-router-dom"

const getPosterUrl = (posterPath) => {
    if (!posterPath) return "/fallback.jpg"; // Ảnh dự phòng nếu không có poster
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
};


const MediaItem = ({ media, mediaType }) => {
    const { listFavorites } = useSelector((state) => state.user)

    const [title, setTitle] = useState("");
    const [posterPath, setPosterPath] = useState("");
    const [releaseDate, setReleaseDate] = useState(null);
    const [rate, setRate] = useState(null);

    useEffect(() => {
        console.log("MediaItem received media:", media);
        setTitle(media.title || media.name || media.mediaTitle);
        setPosterPath(media.poster_path || media.backdrop_path 
            || media.profile_path || media.mediaPoster);

        if (mediaType === tmdbConfigs.mediaType.movie) {
            setReleaseDate(media.release_date && media.release_date.split("-")[0]);
        } else {
            setReleaseDate(media.first_air_date && media.first_air_date.split("-")[0]); 
        }
        setRate(media.vote_average || media.imdbRate || media.mediaRate);

        // Log thông tin media
        console.log("Full media object:", media);
        console.log("Title:", media.title || media.name || media.mediaTitle);
        console.log("Poster Path:", media.poster_path || media.backdrop_path);
        console.log("Release Date:", media.release_date || media.first_air_date);
        console.log("Rate:", media.vote_average || media.imdbRate || media.mediaRate);

    }, [media, mediaType])

    return (
        <>
            <Link to={mediaType !== "people" 
                ? routesGen.mediaDetail(mediaType, media.id || media.mediaId)
                : routesGen.person(media.id)}>
                <Box sx={{
                    ...uiConfigs.style.backgroundImage(posterPath),
                    paddingTop: "160%",
                    "&:hover .media-info": {
                        opacity: 1,
                        bottom: 0,
                    },
                    "&:hover .media-backdrop, &:hover .media-play-btn": {
                        opacity: 1
                    },
                    color: "primary.contrastText",
                }}>
                </Box>
            </Link>
        </>
    )
}

export default MediaItem;