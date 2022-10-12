import * as React from "react";
import { GetPodcastTranscriptsResult } from "../types";
import { HeadFC, Link, graphql } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { compareStrings, findOrError } from "../utils";

type AllEpisodesPageContext = { podcastId: String };

const AllEpisodesPage = ({
  data: {
    dataJson: { podcasts },
  },
  pageContext,
}: PageProps<GetPodcastTranscriptsResult, AllEpisodesPageContext>) => {
  const podcast = findOrError(
    podcasts,
    (p) => p.podcast_id == pageContext.podcastId,
    `Podcast with ID '${pageContext.podcastId}' could not be found.`
  );
  return (
    <>
      <h1>{podcast.podcast_title}</h1>
      {podcast.episodes
        .sort((a, b) => compareStrings(b.published, a.published))
        .map((episode) => (
          <>
            <h2>{episode.episode_title}</h2>
            <ul>
              {episode.transcript.segments
                .sort((a, b) => compareStrings(a.timestamp, b.timestamp))
                .map((segment) => (
                  <li>
                    <Link
                      to={`/podcasts/${podcast.podcast_id}/episode/${episode.episode_slug}`}
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
    </>
  );
};

export default AllEpisodesPage;

export const query = graphql`
  {
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
`;

export const Head: HeadFC = () => <title>Podcast Page</title>;
