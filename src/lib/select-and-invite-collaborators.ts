import { prompt } from "inquirer";
import { githubClient } from "./github-client";
import { Collaborator, Repo } from "./types";

const selectForInviteQuestion = async (collaborators: Collaborator[]) => {
  if (collaborators.length === 0) return undefined;
  return prompt([
    {
      name: "selectedCollaborators",
      type: "checkbox",
      message: "choose collaborators to invite",
      choices: collaborators.map((c) => JSON.stringify(c)),
      pageSize: 50,
    },
  ]);
};

const selectForInviteAnswer =
  (repo: Repo) => async (answer?: { selectedCollaborators: string[] }) => {
    if (!answer) return;
    const { selectedCollaborators } = answer;
    const collaborators = selectedCollaborators.map((s) =>
      JSON.parse(s)
    ) as Collaborator[];

    // TODO: this is bad, might run into GitHub rate limit, also permission should be hoisted up as a parameter
    return await Promise.all(
      collaborators.map((c) => {
        return githubClient
          .put(`/repos/${repo.owner}/${repo.name}/collaborators/${c.login}`, {
            permission: "pull",
          })
          .catch((error) => {
            // print it and ignore it
            console.error(error);
            return [];
          });
      })
    );
  };

export const selectAndInviteCollaborators = (
  repo: Repo,
  collaborators: Collaborator[]
) => {
  return selectForInviteQuestion(collaborators).then(
    selectForInviteAnswer(repo)
  );
};
