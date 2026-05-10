export default function createHeightMap(weeks) {
    return weeks.map(week =>
        week.contributionDays.map(day =>
            day.contributionCount
        )
    );
}