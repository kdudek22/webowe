export const WELL_WIDTH = 6;
export const WELL_HEIGHT = 6;
export const WELL_DEPTH = 10;


export const state = Array.from({ length: WELL_DEPTH }, () =>
  Array.from({ length: WELL_HEIGHT }, () =>
    Array(WELL_WIDTH).fill(0)
  )
);
