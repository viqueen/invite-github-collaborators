import { githubClient } from "./github-client";
import { Repo } from "./types";

export const listCurrentDiscussion = async ({ name, owner }: Repo) => {
  const query = `
        query {
            repository(owner: "${owner}", name: "${name}") {
                discussions(first: 1) {
                    nodes {
                        title
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
      console.info(output.data.repository.discussions);
    })
    .catch((error) => {
      // print it and ignore it
      console.error(error);
      return [];
    });
};
