
exports.calculateMatchScore = (founder, criteria) => {
    let score = 0;

    if (criteria.skills && founder.skills === criteria.skills) {
        score += 10;
    }
    if (criteria.industry && founder.industry === criteria.industry) {
        score += 10;
    }


    if (criteria.location && founder.location === criteria.location) {
        score += 5;
    }


    if (criteria.goals && criteria.goals.some(goal => founder.goals.includes(goal))) {
        score += 5;
    }

    return score;
};


