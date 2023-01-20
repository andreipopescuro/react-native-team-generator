/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      name
      games {
        items {
          id
          tournament_name
          winner
          players
          createdAt
          updatedAt
          userGamesId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      games {
        items {
          id
          tournament_name
          winner
          players
          createdAt
          updatedAt
          userGamesId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      games {
        items {
          id
          tournament_name
          winner
          players
          createdAt
          updatedAt
          userGamesId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame($filter: ModelSubscriptionGameFilterInput) {
    onCreateGame(filter: $filter) {
      user {
        id
        name
        games {
          nextToken
        }
        createdAt
        updatedAt
      }
      id
      tournament_name
      winner
      players
      createdAt
      updatedAt
      userGamesId
    }
  }
`;
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame($filter: ModelSubscriptionGameFilterInput) {
    onUpdateGame(filter: $filter) {
      user {
        id
        name
        games {
          nextToken
        }
        createdAt
        updatedAt
      }
      id
      tournament_name
      winner
      players
      createdAt
      updatedAt
      userGamesId
    }
  }
`;
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame($filter: ModelSubscriptionGameFilterInput) {
    onDeleteGame(filter: $filter) {
      user {
        id
        name
        games {
          nextToken
        }
        createdAt
        updatedAt
      }
      id
      tournament_name
      winner
      players
      createdAt
      updatedAt
      userGamesId
    }
  }
`;
