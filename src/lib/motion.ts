export const duration = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  cinematic: 1.2,
} as const;

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
  expo: [0.16, 1, 0.3, 1] as const,
};

export const spring = {
  soft: { type: "spring" as const, stiffness: 180, damping: 22, mass: 0.8 },
  snappy: { type: "spring" as const, stiffness: 320, damping: 28, mass: 0.6 },
};
