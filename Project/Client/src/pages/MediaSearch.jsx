import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";

const mediaType = ["movie", "tv", "people"];
let timer;
const timeout = 500;

const MediaSearch = () => {
  return <div>MediaSearch</div>;
};

export default MediaSearch;
