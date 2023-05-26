import { reactive } from "vue";

const apiKey = "1c2a1c94a669f2c00dc661ebc0a13765";
const query = "";
const language = "";
const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;

export const store = reactive({
  apiKey,
  query,
  language,
  url,
});
