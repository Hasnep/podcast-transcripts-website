import * as React from "react";
import { HeadFC, Link, graphql } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { GetPodcastTranscriptsResult } from "../types";
import { compareStrings, findOrError } from "../utils";

type PodcastPageContext = { podcastId: String };

const PodcastPage = ({
  data: {
    dataJson: { podcasts },
  },
  pageContext,
}: PageProps<GetPodcastTranscriptsResult, PodcastPageContext>) => {
  const podcast = findOrError(
    podcasts,
    (p) => p.podcast_id == pageContext.podcastId,
    `Podcast with ID '${pageContext.podcastId}' could not be found.`
  );
  return (
    <>
      <h1>{podcast.podcast_title}</h1>
      <p>
        <Link to={`/podcasts/${podcast.podcast_id}/all-episodes`}>
          All episodes
        </Link>
      </p>
      <ul>
        {podcast.episodes
          .sort((a, b) => compareStrings(b.published, a.published))
          .map((episode) => (
            <li>
              <Link
                to={`/podcasts/${podcast.podcast_id}/episodes/${episode.episode_slug}`}
              >
                {episode.episode_title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default PodcastPage;

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
