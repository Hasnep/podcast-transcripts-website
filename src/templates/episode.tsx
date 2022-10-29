import * as React from "react";
import { HeadFC, graphql } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { PageQueryResult } from "../types";
import { compareStrings, getPodcastFromId, getEpisodeFromSlug } from "../utils";

type EpisodePageContext = { podcastId: string; episodeSlug: string };

const EpisodePage = ({
  data: {
    dataJson: { podcasts },
  },
  pageContext: { podcastId, episodeSlug },
}: PageProps<PageQueryResult, EpisodePageContext>) => {
  const podcast = getPodcastFromId(podcasts, podcastId);
  const episode = getEpisodeFromSlug(podcast.episodes, episodeSlug);
  return (
    <main>
      <h1>{podcast.podcastTitle}</h1>
      <h2>{episode.episodeTitle}</h2>
      <>
        {episode.transcript.segments
          .sort((a, b) => compareStrings(a.timestamp, b.timestamp))
          .map((segment) => (
            <p>
              {segment.timestamp} {segment.text}
            </p>
          ))}
      </>
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
