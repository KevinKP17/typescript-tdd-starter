import React from "react";

export default function Hello({name, isPremier}: HelloType) {
  return (
    <React.Fragment>
      <h1 id="title">{name}</h1>
      { isPremier && <span data-testid="premier-badge">Premier</span> }
    </React.Fragment>
  );
}

type HelloType = {
  name?: string,
  isPremier?: boolean
}

