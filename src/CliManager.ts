import RuntimeManager, { RuntimeTypes } from "./RuntimeManager.ts";
import helpText from "./helpText.ts";

enum Keys {
  Target = "-t",
  Out = "-o",
  Log = "-l",
  Help = "--help",
}

export default class CliManager {
  url: string = "";
  private params: string[] = [];

  isNeedOutFile: boolean = false;
  pathToOutFile: string = "./site-link-list";

  isNeedLog: boolean = false;

  constructor() {
    this.params = RuntimeManager.runtimeApi.getCliParams();

    this.normolizeParams();
    this.parseCliParams();
  }

  normolizeParams() {
    // This is done so that, by default, the parameters passed in all runtimes start with 2 indexes.

    if (RuntimeManager.runtime === RuntimeTypes.Deno) {
      this.params = ["Deno", ...this.params];
    }
  }

  parseCliParams() {
    if (this.params.length <= 2) {
      throw new Error("No target URL");
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
              `Bad param for ${param} key. Param is ${nextParam}`
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
        case Keys.Help:
          console.log(helpText);
      }
    }
  }

  checkValidValueInParam(param: string | undefined): boolean {
    if (!param) return false;
    if (param.startsWith("-") || param.startsWith("--")) return false;
    return true;
  }
}
