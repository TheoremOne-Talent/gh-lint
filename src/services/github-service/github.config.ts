import { GraphQLClient } from 'graphql-request';
import { environment } from '../../shared/environment';

export const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: `bearer ${environment.GITHUB_API_TOKEN}`,
  },
});
