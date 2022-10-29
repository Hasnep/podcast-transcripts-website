import * as React from "react";
import { HeadFC, Link } from "gatsby";
import "../styles.scss";
import { graphql, PageProps } from "gatsby";
import { compareStrings } from "../utils";
import { GetPodcastTranscriptsResult } from "../types";

const IndexPage = ({
  data: {
    dataJson: { podcasts },
  },
}: PageProps<PageQueryResult>) => (
  <main>
    <h1>hi</h1>
    <ul>
      {podcasts
        .sort((a, b) => compareStrings(a.podcastTitle, b.podcastTitle))
        .map((podcast) => (
          <li>
            <Link to={`podcasts/${podcast.podcastId}`}>
              {podcast.podcastTitle}
            </Link>
          </li>
        ))}
    </ul>
  </main>
);

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

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
