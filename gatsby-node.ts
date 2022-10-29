import type { GatsbyNode } from "gatsby";
import type { GetPodcastTranscriptsResult } from "./src/types";
import path from "path";
import fs from "fs";
import fetch from "node-fetch";
import { exit } from "process";

export const onPreInit: GatsbyNode["onPreInit"] = async () => {
  // Get the current environment, defaulting to dev
  const environment = process.env.ENV || "dev";
  const isProd = environment == "prod";

  // Only download in prod
  if (isProd) {
    // Get the URL, raising an error if it was not defined
    const url = process.env.DATA_FILE_URL;
    if (typeof url == "undefined") {
      console.error("Environment variable 'DATA_FILE_URL' was not set.");
      exit(1);
    }

    // Create the folder if it doesn't exist
    const dataFolder = path.resolve(path.join(".", "data"));
    if (!fs.existsSync(dataFolder)) {
      console.log(`Creating data folder at '${dataFolder}'.`);
      fs.mkdirSync(dataFolder);
    }

    // Download the file
    const filePath = path.join(dataFolder, "podcast-transcripts.json");
    console.log(`Downloading data to ${filePath}.`);
    const response = await fetch(url);
    const data = await response.json();
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (err) {
        console.error(err);
        exit(1);
      } else {
        console.log("Downloaded data.");
      }
    });
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
  results.data?.dataJson.podcasts.forEach((podcast) => {
    createPage({
      path: `/podcasts/${podcast.podcast_id}`,
      component: path.resolve("./src/templates/podcast.tsx"),
      context: { podcastId: podcast.podcast_id },
    });
    createPage({
      path: `/podcasts/${podcast.podcast_id}/all-episodes`,
      component: path.resolve("./src/templates/all-episodes.tsx"),
      context: { podcastId: podcast.podcast_id },
    });
    podcast.episodes.forEach((episode) => {
      createPage({
        path: `/podcasts/${podcast.podcast_id}/episodes/${episode.episode_slug}`,
        component: path.resolve("./src/templates/episode.tsx"),
        context: {
          podcastId: podcast.podcast_id,
          episodeSlug: episode.episode_slug,
        },
      });
    });
  });
};
