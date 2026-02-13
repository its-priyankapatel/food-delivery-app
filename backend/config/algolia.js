import { algoliasearch } from "algoliasearch";

const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_SEARCH_API_KEY
);

export default client;