import * as React from "react";
import { HeadFC, Link } from "gatsby";
import "../styles.scss";
import { graphql, PageProps } from "gatsby";
import { compareStrings } from "../utils";
import { PageQueryResult } from "../types";

const IndexPage = ({
  data: {
    site: {
      siteMetadata: { siteTitle },
    },
    dataJson: { podcasts },
  },
}: PageProps<PageQueryResult>) => (
  <main>
    <h1>{siteTitle}</h1>
    <h2>About</h2>
    <p>
      A an <a href={"#source-code"}>open source</a> website with automatically
      generated transcripts of podcasts. Uses{" "}
      <a href={"https://openai.com/blog/whisper/"}>OpenAI's Whisper</a> for
      transcription.
    </p>
    <h2>Podcasts</h2>
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
    <h2 id={"source-code"}>Source Code</h2>
    This website and the software that transcribe the podcasts are completely
    free and open source. The copyright of the podcasts are owned by their
    original creators.
    <ul>
      <li>
        <a href={"https://github.com/podcast-transcripts/podcast-transcriber"}>
          Source code
        </a>{" "}
        for the podcast scraper, downloader and transcriber —{" "}
        <a
          href={
            "https://github.com/podcast-transcripts/podcast-transcripts-website/blob/main/LICENCE"
          }
        >
          GPL-3
        </a>
      </li>
      <li>
        <a
          href={
            "https://github.com/podcast-transcripts/podcast-transcripts-website"
          }
        >
          Source code
        </a>{" "}
        for the website you're reading now —{" "}
        <a
          href={
            "https://github.com/podcast-transcripts/podcast-transcripts-website/blob/main/LICENCE"
          }
        >
          GPL-3
        </a>
      </li>
      <li>
        <a href={"https://github.com/openai/whisper"}>Source code</a> for
        OpenAI's Whisper which is used for speech-to-text —{" "}
        <a href={"https://github.com/openai/whisper/blob/main/LICENSE"}>MIT</a>
      </li>
    </ul>
  </main>
);

export const query = graphql`
  {
    site {
      siteMetadata {
        siteTitle: title
      }
    }
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

export const Head: HeadFC<PageQueryResult> = ({
  data: {
    site: {
      siteMetadata: { siteTitle },
    },
  },
}) => <title>{siteTitle}</title>;
