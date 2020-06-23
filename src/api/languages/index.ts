import { get } from "../client";

import type {Response} from './types';

import {Languages} from "@/features/search/model/languages";

const normalizeLanguagesFetch = (json: Response) => Object.values(json);

export const getLanguages = (): Promise<Languages> => get<Response>("/languages").then(normalizeLanguagesFetch);

  
