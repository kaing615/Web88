import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import favoriteApi from "../api/modules/favorite.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { removeFavorite } from "../redux/features/userSlice";

const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    setOnRequest(true);
    const { response, err } = await favoriteApi.remove({
      favoriteId: media.id,
    });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Remove favorite success");
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media.id);
    }
  };

  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} width="300px" />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        Remove
      </LoadingButton>
    </>
  );
};

const FavoriteList = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const skip = 8;

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await favoriteApi.getList();
      console.log("response: ", response, "error", err);
      dispatch(setGlobalLoading(false));
      if (err) toast.error(err.message);
      if (response) {
        setCount(response.data.length);
        setMedias([...response.data]);
        setFilteredMedias([...response.data].splice(0, skip));
      }
    };

    getFavorites();
  }, []);

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newMedias = [...medias].filter((e) => e.id !== id);
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <>
      <Box
        sx={{
          ...uiConfigs.style.mainContent,
        }}
      >
        <Container header={`Your favorites (${count})`}>
          <Grid container spacing={3} justifyContent="center">
            {filteredMedias.map((media, idx) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
                key={media.id || idx}
                style={{
                  justifyContent: "center",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              >
                <FavoriteItem media={media} onRemoved={onRemoved} />
              </Grid>
            ))}
          </Grid>
          {filteredMedias.length < medias.length && (
            <Button onClick={onLoadMore}>Load More</Button>
          )}
        </Container>
      </Box>
    </>
  );
};

export default FavoriteList;
