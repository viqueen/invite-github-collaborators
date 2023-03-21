import { githubClient } from "./github-client";
import { Repo } from "./types";

export const listDiscussionReactions = async ({ name, owner }: Repo) => {
  const query = `
        query {
            repository(owner: "${owner}", name: "${name}") {
                discussions(first: 1) {
                    nodes {
                        reactions(first: 50, content: EYES) {
                            nodes {
                                user {
                                    name
                                    login
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

  return await githubClient
    .post(`/graphql`, {
      query,
    })
    .then(({ data: output }) => {
      // TODO: this is bad, but building for happy path only
      return output.data.repository.discussions.nodes[0].reactions.nodes;
    })
    .catch((error) => {
      // print it and ignore it
      console.error(error);
      return [];
    });
};
