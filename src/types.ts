export type Segment = {
  text: string;
  timestamp: string;
};

export type Episode = {
  episode_title: string;
  episode_slug: string;
  published: string;
  transcript: {
    segments: Segment[];
  };
};

export type Podcast = {
  podcast_id: string;
  podcast_title: string;
  episodes: Episode[];
};

export type GetPodcastTranscriptsResult = {
  dataJson: {
    podcasts: Podcast[];
  };
};
