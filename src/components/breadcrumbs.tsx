import * as React from "react";
import { Podcast, Episode } from "../types";
import { Link } from "gatsby";

type BreadcrumbsProps = {
  podcast: Podcast | null;
  episode: Episode | null;
  isAllEpisodes: boolean;
};

export const Breadcrumbs = ({
  podcast,
  episode,
  isAllEpisodes,
}: BreadcrumbsProps) => {
  const crumbs = [
    <Link to="/">Podcasts</Link>,
    podcast !== null ? (
      <Link to={`/podcasts/${podcast.podcastId}`}>{podcast.podcastTitle}</Link>
    ) : null,
    podcast !== null && episode !== null ? (
      <Link to={`/podcasts/${podcast.podcastId}/episodes/${episode.slug}`}>
        {episode.episodeTitle}
      </Link>
    ) : null,
    podcast !== null && episode === null && isAllEpisodes ? (
      <Link to={`/podcasts/${podcast.podcastId}/all-episodes`}>
        All episodes
      </Link>
    ) : null,
  ].filter((c) => c !== null);
  return (
    <ul className="breadcrumbs">
      {crumbs.map((c) => (
        <li>{c}</li>
      ))}
    </ul>
  );
};
