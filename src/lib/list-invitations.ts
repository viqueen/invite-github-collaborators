import { Repo } from "./types";
import { githubClient } from "./github-client";

export const listInvitations = async ({ owner, name }: Repo) => {
  // TODO: this is bad, where's that catch thing, what if it blows up in live demo ... deal with it then
  return await githubClient
    .get(`/repos/${owner}/${name}/invitations`)
    .then((response) => response.data)
    .then((list) =>
      list.map(({ invitee, permissions }: any) => ({
        login: invitee.login,
        permissions,
      }))
    )
    .catch((error) => {
      // print it and ignore it
      console.error(error);
      return [];
    });
};
