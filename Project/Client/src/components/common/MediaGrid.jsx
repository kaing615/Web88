import { Grid } from "@mui/material";
import MediaItem from "./MediaItem";

const MediaGrid = ({ medias, mediaType }) => {
  console.log("Medias render trong MediaGrid:", medias);
  return (
    <Grid container spacing={1}>
      {medias.map((media, index) => (
        <Grid item xs={6} sm={4} md={3} key={media.id || index}>
          <MediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaGrid;
