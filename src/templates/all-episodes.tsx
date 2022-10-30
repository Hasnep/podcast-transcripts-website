import * as React from "react";
import { PageQueryResult } from "../types";
import { HeadFC, Link, graphql } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { compareStrings, getPodcastFromId } from "../utils";
import { Segments } from "../components/segments";

type AllEpisodesPageContext = { podcastId: string };

const AllEpisodesPage = ({
  data: {
    site: {
      siteMetadata: { siteTitle },
    },
    dataJson: { podcasts },
  },
  pageContext,
}: PageProps<PageQueryResult, AllEpisodesPageContext>) => {
  const podcast = getPodcastFromId(podcasts, pageContext.podcastId);
  return (
    <main>
      <h1>{siteTitle}</h1>
      <h2>{podcast.podcastTitle}</h2>
      {podcast.episodes
        .sort((a, b) => compareStrings(b.published, a.published))
        .map((episode) => (
          <>
            <h2>{episode.episodeTitle}</h2>
            <Segments podcast={podcast} episode={episode} />
          </>
        ))}
    </main>
  );
};

export default AllEpisodesPage;

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

export const Head: HeadFC<PageQueryResult, AllEpisodesPageContext> = ({
  data: {
    site: {
      siteMetadata: { siteTitle },
    },
    dataJson: { podcasts },
  },
  pageContext: { podcastId },
}) => {
  const podcast = getPodcastFromId(podcasts, podcastId);
  return (
    <title>
      {siteTitle} — {podcast.podcastTitle} — All episodes
    </title>
  );
};
