import React, { useState, useEffect } from 'react'
import { deattribute } from 'kitsu-core'
// import Premiericon from "./premierBadge.svg"


export default function Hello({name, isPremier}: HelloType) {

  return (
    <>
      <h1 id="title">{name}</h1>
      { isPremier && <span data-testid="premier-badge">Premier</span> }
    </>
  );
}





type HelloType = {
  name?: string,
  isPremier?: boolean
}

