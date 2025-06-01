import { Grid } from "@mui/material";
import MediaItem from "./MediaItem";

const MediaGrid = ({ medias, mediaType }) => (
  <Grid container spacing={3} justifyContent="center">
    {medias.length === 0 && <div>NO DATA!</div>}
    {medias.map((media, idx) => (
      <Grid
        item
        xs={6} // 2 item trên 1 hàng ở mobile
        sm={4} // 3 item trên 1 hàng ở tablet nhỏ
        md={3} // 4 item trên 1 hàng ở tablet lớn
        lg={2} // 6 item trên 1 hàng ở desktop
        key={media.id || idx}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <MediaItem media={media} mediaType={mediaType} />
      </Grid>
    ))}
  </Grid>
);

export default MediaGrid;
