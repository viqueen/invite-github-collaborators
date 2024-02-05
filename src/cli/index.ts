import { Command } from "commander";
import { listDiscussionReactions } from "../lib/list-discussion-reactions";
import { selectAndInviteCollaborators } from "../lib/select-and-invite-collaborators";
import { listCollaborators } from "../lib/list-collaborators";
import { listInvitations } from "../lib/list-invitations";
import keyBy from "lodash/keyBy";
import { Collaborator } from "../lib/types";
import { listCurrentDiscussion } from "../lib/list-current-discussion";

const program = new Command();

program
  .command("current-discussion")
  .option("-o, --owner", "with repo owner", "labset")
  .option("-n, --name", "with repo name", "jdk")
  .action(async (opts) => {
    const { owner, name } = opts;
    await listCurrentDiscussion({
      name,
      owner,
    });
  });

// TODO: this is bad, should not have hard-coded values,
//  pull them out of env vars, but this is fine for now
program
  .command("invite-them")
  .option("-o, --owner", "with repo owner", "labset")
  .option("-n, --name", "with repo name", "compiler-workshop")
  .action(async (opts) => {
    const { owner, name } = opts;
    const output = await listDiscussionReactions({
      name,
      owner,
    });
    const collaborators = output.map((i: any) => i.user) as Collaborator[];
    const byLogin = keyBy(collaborators, (c) => c.login);

    console.info(byLogin);

    await selectAndInviteCollaborators({ name, owner }, collaborators);
  });

program
  .command("list-them")
  .option("-o, --owner", "with repo owner", "labset")
  .option("-n, --name", "with repo name", "compiler-workshop")
  .action(async (opts) => {
    const { owner, name } = opts;
    const output = await listCollaborators({ name, owner });
    console.table(output);
  });

program
  .command("list-invitations")
  .option("-o, --owner", "with repo owner", "labset")
  .option("-n, --name", "with repo name", "compiler-workshop")
  .action(async (opts) => {
    const { owner, name } = opts;
    const output = await listInvitations({ name, owner });
    console.table(output);
  });

program.version("1.0.0");
program.parse(process.argv);
