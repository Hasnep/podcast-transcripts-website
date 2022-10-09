import * as React from "react";
import { HeadFC } from "gatsby";
import "../styles.scss";
import { PageProps } from "gatsby";
import { Podcast, Episode } from "../types";
import { compareStrings } from "../utils";

const EpisodePage = ({ pageContext }: PageProps) => {
  const podcast: Podcast = pageContext.podcast;
  const episode: Episode = pageContext.episode;
  return (
    <>
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
    </>
  );
};

export default EpisodePage;

export const Head: HeadFC = () => <title>Podcast Page</title>;
