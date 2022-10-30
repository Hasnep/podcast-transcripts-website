# Podcast Transcripts Website

The source code for the [podcast transcripts website](https://podcast-transcripts.netlify.app/).

## Development

### Building

Use the [podcast transcriber tool](https://github.com/podcast-transcripts/podcast-transcriber) to transcribe some podcasts and copy the output data file to `data/podcast-transcripts.json`.

Install [Node.js](https://nodejs.org/en/download/) version 18.

Install the Node.js dependencies:

```shell
npm install
```

Build the website:

```shell
npm run build
```

The build website will be in the `public` folder.

### Pre-commit

Install [pre-commit](https://pre-commit.com/#install), then enable the pre-commit hooks in the repo:

```shell
pre-commit install
```
