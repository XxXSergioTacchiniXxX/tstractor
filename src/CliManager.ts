enum Keys {
  Target = "-t",
  Out = "-o",
  Log = "-l",
}

export enum RunTime {
  Deno,
  Bun,
}

export default class CliManager {
  url: string = "";
  private params: string[] = [];

  isNeedOutFile: boolean = false;
  pathToOutFile: string = "./site-link-list";

  isNeedLog: boolean = false;

  static readonly runTime: RunTime = this.defineRunTime();

  constructor() {
    // @ts-ignore
    if (CliManager.runTime === RunTime.Deno) {
      // @ts-ignore
      this.params = Deno?.args;
    }
    if (CliManager.runTime === RunTime.Bun) {
      // @ts-ignore
      this.params = process.argv;
    }

    this.normolizeParams();
    this.parseCliParams();
  }

  normolizeParams() {
    // This is done so that, by default, the parameters passed in all runtimes start with 2 indexes.

    if (CliManager.runTime === RunTime.Deno) {
      this.params = ["Deno", ...this.params];
    }
  }

  parseCliParams() {
    console.log(this.params);

    if (this.params.length <= 2) {
      throw new Error("No toraget URL");
    }

    if (!this.params.includes(Keys.Target)) {
      this.url = this.params[2];
    }

    for (let i = 0; i <= this.params.length; i++) {
      const param = this.params[i];
      const nextParam = this.params[i + 1];

      switch (param) {
        case Keys.Log:
          this.isNeedLog = true;
          break;
        case Keys.Target:
          if (this.checkValidValueInParam(nextParam)) {
            this.url = nextParam;
            i += 1;
          } else {
            throw new Error(
              `Bad param for ${param} key. Param is ${nextParam}`,
            );
          }
          break;
        case Keys.Out:
          this.isNeedOutFile = true;
          if (this.checkValidValueInParam(nextParam)) {
            this.pathToOutFile = nextParam;
            i += 1;
          }
          break;
      }
    }
  }

  checkValidValueInParam(param: string | undefined): boolean {
    if (!param) return false;
    if (param.startsWith("-")) return false;
    return true;
  }

  static defineRunTime(): RunTime {
    // @ts-ignore
    if (globalThis?.Deno) {
      // @ts-ignore
      return RunTime.Deno;
    }
    if (globalThis?.Bun) {
      // @ts-ignore
      return RunTime.Bun;
    }

    throw new Error("Undefined runtime");
  }
}
