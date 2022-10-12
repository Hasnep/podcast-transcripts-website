import type { GatsbyNode } from "gatsby";
import type { GetPodcastTranscriptsResult } from "./src/types";
import path from "path";
import https from "https";
import fs from "fs";

export const onPreInit: GatsbyNode["onPreInit"] = () => {
  const environment = process.env.ENV || "dev";
  const is_prod = environment == "prod";

  // Only download in prod
  if (is_prod) {
    console.log("Downloading data.");
    const url = process.env.DATA_FILE_URL || "";
    const filePath = "./data/podcast-transcripts.json";
    // Create the folder if it doesn't exist
    if (!fs.existsSync("./data")) {
      fs.mkdirSync("./data");
    }
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      response.pipe(file);
      file
        .on("finish", () => file.close())
        .on("error", (err) => fs.unlink(filePath, (err) => {}));
    });
    console.log("Downloaded data.");
  } else {
    console.log("Skipping download.");
  }
};

export const createPages: GatsbyNode["createPages"] = async ({
  actions: { createPage },
  graphql,
}) => {
  const results: { data?: GetPodcastTranscriptsResult; errors?: any } =
    await graphql(`
      query getPodcasts {
        dataJson {
          podcasts {
            podcast_id
            podcast_title
            episodes {
              episode_title
              episode_slug
              published
              transcript {
                segments {
                  text
                  timestamp
                }
              }
            }
          }
        }
      }
    `);
  results.data.dataJson.podcasts.forEach((podcast) => {
    createPage({
      path: `/podcasts/${podcast.podcast_id}`,
      component: path.resolve("./src/templates/podcast.tsx"),
      context: { podcast: podcast },
    });
    createPage({
      path: `/podcasts/${podcast.podcast_id}/all-episodes`,
      component: path.resolve("./src/templates/all-episodes.tsx"),
      context: { podcast: podcast },
    });
    podcast.episodes.forEach((episode) => {
      createPage({
        path: `/podcasts/${podcast.podcast_id}/episodes/${episode.episode_slug}`,
        component: path.resolve("./src/templates/episode.tsx"),
        context: { podcast: podcast, episode: episode },
      });
    });
  });
};
