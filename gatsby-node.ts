import type { GatsbyNode } from "gatsby";
import type { GetPodcastTranscriptsResult } from "./src/types";
import path from "path";

export const createPages: GatsbyNode["createPages"] = async ({
  actions: { createPage },
  graphql,
}) => {
  const results: { data?: GetPodcastTranscriptsResult; errors?: any } =
    await graphql(`
      {
        dataJson {
          podcasts {
            podcastId: podcast_id
            podcastTitle: podcast_title
            episodes {
              episodeTitle: episode_title
              slug: episode_slug
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
      path: `/podcasts/${podcast.podcastId}`,
      component: path.resolve("./src/templates/podcast.tsx"),
      context: { podcastId: podcast.podcastId },
    });
    createPage({
      path: `/podcasts/${podcast.podcastId}/all-episodes`,
      component: path.resolve("./src/templates/all-episodes.tsx"),
      context: { podcastId: podcast.podcastId },
    });
    podcast.episodes.forEach((episode) => {
      createPage({
        path: `/podcasts/${podcast.podcastId}/episodes/${episode.slug}`,
        component: path.resolve("./src/templates/episode.tsx"),
        context: {
          podcastId: podcast.podcastId,
          episodeSlug: episode.slug,
        },
      });
    });
  });
};
