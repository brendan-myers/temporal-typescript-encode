import { sleep } from "@temporalio/workflow";

// @@@SNIPSTART typescript-encryption-workflow
export async function example(message: string): Promise<string> {
  await sleep(10_000);
  return `${message}\nBob: Hi Alice, I'm Workflow Bob.`;
}
// @@@SNIPEND
