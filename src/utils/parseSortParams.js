import { SORT_ORDER } from "../constans/index.js";

const ParseSortOrder = (sortOrder) => {
    const isKnownSortOrder = [SORT_ORDER.ACS, SORT_ORDER.DESC].includes(sortOrder);
    if (isKnownSortOrder) {
        return sortOrder;
    }
    return SORT_ORDER.ACS;
};

const parseSortBy = (sortBy) => {
    const keysOfTeachers = ['id', 'name', 'surname', 'language', 'levels', 'rating', 'prise_per_hour', 'lessons_done',];
    if (keysOfTeachers.includes(sortBy)) {
        return sortBy;
    }
    return 'id';
};

export const parseSortParams = (query) => {
    const { sortBy, sortOrder } = query;
    return {
        sortBy: parseSortBy(sortBy),
        sortOrder: ParseSortOrder(sortOrder),
    };
};
