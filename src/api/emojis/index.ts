import { get } from "../client";
import { Emojis } from "@/features/application/model/emojis";

export const getEmojis = (): Promise<Emojis> => get<Emojis>("/emojis");
