import { Command } from "commander";
import { listDiscussionReactions } from "../lib/list-discussion-reactions";

const program = new Command();

program
  .command("list-reactions")
  .option("-o, --owner", "with repo owner", "labset")
  .option("-n, --name", "with repo name", "jdk")
  .action(async (opts) => {
    const { owner, name } = opts;
    const output = await listDiscussionReactions({
      repoOwner: owner,
      repoName: name,
    });
    console.table(output.map((i: any) => i.user));
  });

program.version("1.0.0");
program.parse(process.argv);
