import * as React from "react";
import { HeadFC, graphql } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { PageQueryResult } from "../types";
import { compareStrings, getPodcastFromId, getEpisodeFromSlug } from "../utils";
import { Segments } from "../components/segments";

type EpisodePageContext = { podcastId: string; episodeSlug: string };

const EpisodePage = ({
  data: {
    site: {
      siteMetadata: { siteTitle },
    },
    dataJson: { podcasts },
  },
  pageContext: { podcastId, episodeSlug },
}: PageProps<PageQueryResult, EpisodePageContext>) => {
  const podcast = getPodcastFromId(podcasts, podcastId);
  const episode = getEpisodeFromSlug(podcast.episodes, episodeSlug);
  return (
    <main>
      <h1>{siteTitle}</h1>
      <h2>{podcast.podcastTitle}</h2>
      <h3>{episode.episodeTitle}</h3>
      <Segments podcast={podcast} episode={episode} />
    </main>
  );
};

export default EpisodePage;

export const query = graphql`
  {
    site {
      siteMetadata {
        siteTitle: title
      }
    }
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
`;

export const Head: HeadFC<PageQueryResult, EpisodePageContext> = ({
  data: {
    site: {
      siteMetadata: { siteTitle },
    },
    dataJson: { podcasts },
  },
  pageContext: { podcastId, episodeSlug },
}) => {
  const podcast = getPodcastFromId(podcasts, podcastId);
  const episode = getEpisodeFromSlug(podcast.episodes, episodeSlug);
  return (
    <title>
      {siteTitle} — {podcast.podcastTitle} — {episode.episodeTitle}
    </title>
  );
};
