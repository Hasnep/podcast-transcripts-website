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
}: PageProps<GetPodcastTranscriptsResult>) => {
  return (
    <>
      <h1>hi</h1>
      <ul>
        {podcasts
          .sort((a, b) => compareStrings(a.podcast_title, b.podcast_title))
          .map((podcast) => (
            <li>
              <Link to={`podcasts/${podcast.podcast_id}`}>
                {podcast.podcast_title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

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

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
