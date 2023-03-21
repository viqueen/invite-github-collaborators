import { githubClient } from "./github-client";

type ListDiscussionReactionsProps = {
  repoOwner: string;
  repoName: string;
};

export const listDiscussionReactions = async ({
  repoOwner,
  repoName,
}: ListDiscussionReactionsProps) => {
  const query = `
        query {
            repository(owner: "${repoOwner}", name: "${repoName}") {
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
    });
};
