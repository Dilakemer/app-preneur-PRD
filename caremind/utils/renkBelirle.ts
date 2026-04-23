export const durumRengiBelirle = (kalanGun: number) => {
  if (kalanGun < 15) {
    return 'red' as const;
  }

  if (kalanGun <= 30) {
    return 'yellow' as const;
  }

  return 'green' as const;
};
