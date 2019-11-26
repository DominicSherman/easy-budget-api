export const timePeriod = `
type TimePeriod {
    timePeriodId: ID!
    beginDate: String!
    endDate: String!
    userId: String!
}

input CreateTimePeriod {
    timePeriodId: String!
    beginDate: String!
    endDate: String!
    userId: String!
}

input TimePeriodInput {
    beginDate: String!
    endDate: String!
}
`;
