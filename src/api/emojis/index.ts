import { get } from "../client";
import { Emojis } from "@/app/model/emojis";

export const getEmojis = (): Promise<Emojis> => get<Emojis>("/emojis");
