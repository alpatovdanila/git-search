import { get } from "../client";
import { Emojis } from "@/features/search/model/emojis";

export const getEmojis = (): Promise<Emojis> => get<Emojis>("/emojis");
