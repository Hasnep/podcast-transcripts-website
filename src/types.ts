export type Segment = {
  text: string;
  timestamp: string;
};

export type Episode = {
  episodeTitle: string;
  slug: string;
  published: string;
  transcript: {
    segments: Segment[];
  };
};

export type Podcast = {
  podcastId: string;
  podcastTitle: string;
  episodes: Episode[];
};

export type PageQueryResult = {
  site: {
    siteMetadata: {
      siteTitle: string;
    };
  };
  dataJson: {
    podcasts: Podcast[];
  };
};
