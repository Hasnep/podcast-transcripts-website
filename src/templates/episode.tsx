import * as React from "react";
import { HeadFC, graphql } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { GetPodcastTranscriptsResult } from "../types";
import { compareStrings, findOrError } from "../utils";

type EpisodePageContext = { podcastId: String; episodeSlug: String };

const EpisodePage = ({
  data: {
    dataJson: { podcasts },
  },
  pageContext,
}: PageProps<GetPodcastTranscriptsResult, EpisodePageContext>) => {
  const podcast = findOrError(
    podcasts,
    (p) => p.podcast_id == pageContext.podcastId,
    `Podcast with ID '${pageContext.podcastId}' could not be found.`
  );
  const episode = findOrError(
    podcast.episodes,
    (e) => e.episode_slug == pageContext.episodeSlug,
    `Episode with slug '${pageContext.episodeSlug}' could not be found.`
  );
  return (
    <main>
      <h1>{podcast.podcast_title}</h1>
      <h2>{episode.episode_title}</h2>
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
