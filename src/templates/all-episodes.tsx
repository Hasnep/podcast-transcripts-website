import * as React from "react";
import { GetPodcastTranscriptsResult } from "../types";
import { HeadFC, Link, graphql } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { compareStrings, findOrError } from "../utils";

type AllEpisodesPageContext = { podcastId: string };

const AllEpisodesPage = ({
  data: {
    dataJson: { podcasts },
  },
  pageContext,
}: PageProps<GetPodcastTranscriptsResult, AllEpisodesPageContext>) => {
  const podcast = findOrError(
    podcasts,
    (p) => p.podcastId == pageContext.podcastId,
    `Podcast with ID '${pageContext.podcastId}' could not be found.`,
  );
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

export const Head: HeadFC = () => <title>Podcast Page</title>;
