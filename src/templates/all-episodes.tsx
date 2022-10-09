import * as React from "react";
import { HeadFC, Link } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { Podcast } from "../types";
import { compareStrings } from "../utils";

const AllEpisodesPage = ({ pageContext }: PageProps) => {
  const podcast: Podcast = pageContext.podcast;
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

export const Head: HeadFC = () => <title>Podcast Page</title>;
