import type { GatsbyNode } from "gatsby";
import type { GetPodcastTranscriptsResult } from "./src/types";
import path from "path";

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
