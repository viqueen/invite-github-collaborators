import { Repo } from "./types";
import { githubClient } from "./github-client";

export const listCollaborators = async ({ owner, name }: Repo) => {
  // TODO: this is bad, where's that catch thing, what if it blows up in live demo ... deal with it then
  return await githubClient
    .get(`/repos/${owner}/${name}/collaborators`)
    .then((response) => response.data)
    .then((list) =>
      list.map(({ login, role_name }: any) => ({ login, role_name }))
    );
};
