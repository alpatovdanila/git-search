import { get } from "../client";
import { Language, Languages } from "@/features/application/model/languages";

type Response = { [key: string]: Language };

const normalizeLanguagesFetch = (json: Response) => Object.values(json);

export const getLanguages = (): Promise<Languages> =>
  get<Response>("/languages").then(normalizeLanguagesFetch);
