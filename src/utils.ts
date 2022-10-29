import { Podcast, Episode } from "./types";

export const compareStrings = (a: string, b: string) =>
  a.toLowerCase().localeCompare(b.toLowerCase());

const findOrError = <T>(
  array: Array<T>,
  predicate: (arg0: T) => boolean,
  errorMessage: string,
): T => {
  const output = array.find(predicate);
  if (typeof output == "undefined") {
    throw Error(errorMessage);
  }
  return output;
};

export const getPodcastFromId = (
  podcasts: Array<Podcast>,
  podcastId: string,
): Podcast =>
  findOrError(
    podcasts,
    (p) => p.podcastId == podcastId,
    `Podcast with ID '${podcastId}' could not be found.`,
  );

export const getEpisodeFromSlug = (
  episodes: Array<Episode>,
  episodeSlug: string,
) =>
  findOrError(
    episodes,
    (e) => e.slug == episodeSlug,
    `Episode with slug '${episodeSlug}' could not be found.`,
  );
