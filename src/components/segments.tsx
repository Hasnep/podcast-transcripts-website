import * as React from "react";
import { compareStrings } from "../utils";
import { Segment, Podcast, Episode } from "../types";
import { Link } from "gatsby";

type SegmentsProps = {
  podcast: Podcast;
  episode: Episode;
};

export const Segments = ({ podcast, episode }: SegmentsProps) => (
  <ul className="segments">
    {episode.transcript.segments
      .sort((a, b) => compareStrings(a.timestamp, b.timestamp))
      .map((segment) => (
        <li id={`${podcast.podcastId}-${episode.slug}-${segment.timestamp}`}>
          {/* <Link
            to={`/podcasts/${podcast.podcastId}/episodes/${episode.slug}#${podcast.podcastId}/${episode.slug}/${segment.timestamp}`}
          > */}
          {segment.timestamp}
          {/* </Link> */}
          {" - "}
          {segment.text}
        </li>
      ))}
  </ul>
);
