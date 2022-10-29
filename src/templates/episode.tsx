import * as React from "react";
import { HeadFC, graphql } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { GetPodcastTranscriptsResult } from "../types";
import { compareStrings, findOrError } from "../utils";

type EpisodePageContext = { podcastId: string; episodeSlug: string };

const EpisodePage = ({
  data: {
    dataJson: { podcasts },
  },
  pageContext,
}: PageProps<GetPodcastTranscriptsResult, EpisodePageContext>) => {
  const podcast = findOrError(
    podcasts,
    (p) => p.podcastId == pageContext.podcastId,
    `Podcast with ID '${pageContext.podcastId}' could not be found.`,
  );
  const episode = findOrError(
    podcast.episodes,
    (e) => e.slug == pageContext.episodeSlug,
    `Episode with slug '${pageContext.episodeSlug}' could not be found.`,
  );
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
