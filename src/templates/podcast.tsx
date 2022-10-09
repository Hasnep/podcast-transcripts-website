import * as React from "react";
import { HeadFC, Link } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { Podcast } from "../types";
import { compareStrings } from "../utils";

const PodcastPage = ({ pageContext }: PageProps) => {
  const podcast: Podcast = pageContext.podcast;
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

export const Head: HeadFC = () => <title>Podcast Page</title>;
