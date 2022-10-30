import * as React from "react";
import { HeadFC, Link, graphql } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { PageQueryResult } from "../types";
import { compareStrings, getPodcastFromId } from "../utils";

type PodcastPageContext = { podcastId: string };

const PodcastPage = ({
  data: {
    site: {
      siteMetadata: { siteTitle },
    },
    dataJson: { podcasts },
  },
  pageContext,
}: PageProps<PageQueryResult, PodcastPageContext>) => {
  const podcast = getPodcastFromId(podcasts, pageContext.podcastId);
  return (
    <main>
      <h1>{siteTitle}</h1>
      <h2>{podcast.podcastTitle}</h2>
      <ul>
        <li>
          <Link to={`/podcasts/${podcast.podcastId}/all-episodes`}>
            All episodes
          </Link>
        </li>
        {podcast.episodes
          .sort((a, b) => compareStrings(b.published, a.published))
          .map((episode) => (
            <li>
              <Link
                to={`/podcasts/${podcast.podcastId}/episodes/${episode.slug}`}
              >
                {episode.episodeTitle}
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default PodcastPage;

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

export const Head: HeadFC<PageQueryResult, PodcastPageContext> = ({
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
      {siteTitle} — {podcast.podcastTitle}
    </title>
  );
};
