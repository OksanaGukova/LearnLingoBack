const parseLanguages = (languages) => {
    if (typeof languages !== 'string') return;

    const allowedLanguages = [
        'English',
        'Spanish',
        'French',
        'German',
        'Italian',
        'Mandarin Chinese',
        'Korean',
        'Vietnamese',
    ];

    if (!allowedLanguages.includes(languages)) return;

    return languages;
};

const parseLevels = (levels) => {
    if (typeof levels !== 'string') return;

    const allowedLevels = [
        'A1 Beginner',
        'A2 Elementary',
        'B1 Intermediate',
        'B2 Upper-Intermediate',
        'C1 Advanced',
        'C2 Proficient',
    ];

    if (!allowedLevels.includes(levels)) return;

    return levels;
};

const parseNumber = (number) => {
    if (typeof number !== 'string') return;

    const parsedNumber = Number(number);

    if (Number.isNaN(parsedNumber)) return;

    return parsedNumber;
};

export const parseFilterParams = (query) => {
    const {
        languages,
        levels,
        minRating,
        maxRating,
        minPricePerHour,
        maxPricePerHour,
        minLessonsDone,
        maxLessonsDone,
    } = query;

    return {
        languages: parseLanguages(languages),
        levels: parseLevels(levels),
        minRating: parseNumber(minRating),
        maxRating: parseNumber(maxRating),
        minPricePerHour: parseNumber(minPricePerHour),
        maxPricePerHour: parseNumber(maxPricePerHour),
        minLessonsDone: parseNumber(minLessonsDone),
        maxLessonsDone: parseNumber(maxLessonsDone),
    };
};
