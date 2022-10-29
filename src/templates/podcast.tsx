import * as React from "react";
import { HeadFC, Link, graphql } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { GetPodcastTranscriptsResult } from "../types";
import { compareStrings, findOrError } from "../utils";

type PodcastPageContext = { podcastId: string };

const PodcastPage = ({
  data: {
    dataJson: { podcasts },
  },
  pageContext,
}: PageProps<GetPodcastTranscriptsResult, PodcastPageContext>) => {
  const podcast = findOrError(
    podcasts,
    (p) => p.podcastId == pageContext.podcastId,
    `Podcast with ID '${pageContext.podcastId}' could not be found.`,
  );
  return (
    <main>
      <h1>{podcast.podcastTitle}</h1>
      <p>
        <Link to={`/podcasts/${podcast.podcastId}/all-episodes`}>
          All episodes
        </Link>
      </p>
      <ul>
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
