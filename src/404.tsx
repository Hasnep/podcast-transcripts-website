import * as React from "react";
import { HeadFC } from "gatsby";
import "./styles.scss";

const FourOhFourPage = () => (
  <main>
    <h1>404 — Page not found</h1>
  </main>
);

export default FourOhFourPage;

export const Head: HeadFC = () => <title>404 — Page not found</title>;
