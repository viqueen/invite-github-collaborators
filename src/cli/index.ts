import { Command } from "commander";
import { listDiscussionReactions } from "../lib/list-discussion-reactions";
import { selectAndInviteCollaborators } from "../lib/select-and-invite-collaborators";
import { listCollaborators } from "../lib/list-collaborators";
import { listInvitations } from "../lib/list-invitations";

const program = new Command();

// TODO: this is bad, should not have hard-coded values,
//  pull them out of env vars, but this is fine for now
program
  .command("invite-them")
  .option("-o, --owner", "with repo owner", "labset")
  .option("-n, --name", "with repo name", "jdk")
  .action(async (opts) => {
    const { owner, name } = opts;
    const output = await listDiscussionReactions({
      name,
      owner,
    });
    const collaborators = output.map((i: any) => i.user);
    await selectAndInviteCollaborators({ name, owner }, collaborators);
  });

program
  .command("list-them")
  .option("-o, --owner", "with repo owner", "labset")
  .option("-n, --name", "with repo name", "jdk")
  .action(async (opts) => {
    const { owner, name } = opts;
    const output = await listCollaborators({ name, owner });
    console.table(output);
  });

program
  .command("list-invitations")
  .option("-o, --owner", "with repo owner", "labset")
  .option("-n, --name", "with repo name", "jdk")
  .action(async (opts) => {
    const { owner, name } = opts;
    const output = await listInvitations({ name, owner });
    console.table(output);
  });

program.version("1.0.0");
program.parse(process.argv);
