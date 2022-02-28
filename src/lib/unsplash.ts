import { createApi } from "unsplash-js";

const REACT_APP_UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
const UNSPLASH_API = createApi({ accessKey: REACT_APP_UNSPLASH_API_KEY });

export default UNSPLASH_API;