import {SearchSort} from "@/api/repositories";


export type SortOption = {
    label:string,
    sort:SearchSort,
}

export const sortOptions: SortOption[] = [
    {
        label:'Stars',
        sort:"stars"
    },
    {
        label:'Forks',
        sort:"forks"
    },
    {
        label:'Help wanted issues',
        sort:"help-wanted-issues"
    },
    {
        label:'Best match',
        sort:"best-match"
    },
    {
        label:'Updated',
        sort:"updated"
    },

];

