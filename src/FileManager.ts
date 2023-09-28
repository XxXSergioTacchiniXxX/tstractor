import CliManager, { RunTime } from "./CliManager.ts";

type WriteParam = [PathLike, string];

export class FileManager {
  static async writeToFileByPath(...params: WriteParam) {
    if (CliManager.runTime === RunTime.Bun) {
      await this.writeFileBun(...params);
      return;
    }
    if (CliManager.runTime === RunTime.Deno) {
      await this.writeFileDeno(...params);
      return;
    }

    throw new Error("Unndefined RunTime when writing to file");
  }

  private static async writeFileDeno(...params: WriteParam) {
    // @ts-ignore
    await Deno?.writeTextFile(...params);
  }

  private static async writeFileBun(path: PathLike, content: string) {
    await Bun.write(path, content);
  }
}
