import * as React from "react";
import { PageQueryResult } from "../types";
import { HeadFC, Link, graphql } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { compareStrings, getPodcastFromId } from "../utils";

type AllEpisodesPageContext = { podcastId: string };

const AllEpisodesPage = ({
  data: {
    dataJson: { podcasts },
  },
  pageContext,
}: PageProps<PageQueryResult, AllEpisodesPageContext>) => {
  const podcast = getPodcastFromId(podcasts, pageContext.podcastId);
  return (
    <main>
      <h1>{podcast.podcastTitle}</h1>
      {podcast.episodes
        .sort((a, b) => compareStrings(b.published, a.published))
        .map((episode) => (
          <>
            <h2>{episode.episodeTitle}</h2>
            <ul>
              {episode.transcript.segments
                .sort((a, b) => compareStrings(a.timestamp, b.timestamp))
                .map((segment) => (
                  <li>
                    <Link
                      to={`/podcasts/${podcast.podcastId}/episode/${episode.slug}`}
                    >
                      {segment.timestamp}
                    </Link>
                    {" - "}
                    {segment.text}
                  </li>
                ))}
            </ul>
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
