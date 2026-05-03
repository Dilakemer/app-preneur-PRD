export const BILDIRIM_GUNLERI = [60, 30, 7, 1] as const;

export type BildirimGunu = (typeof BILDIRIM_GUNLERI)[number];
