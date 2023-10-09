import CliManager from "./CliManager.ts";
import FileManager from "./FileManager.ts";
import { Manager } from "./Core/SearchManager.ts";
import { RequestUnit } from "./Core/RequestUnit.ts";
import {
  INTERVAL_DELAY_LOG,
  INTERVAL_DELAY_NO_LOG,
  MAX_REUEST_UNIT,
} from "./config.ts";

(async function() {
  const cliManager = new CliManager();
  const fileManager = new FileManager();

  const manager = new Manager([cliManager.url]);
  const unitPull = [];

  for (let i = 0; i < MAX_REUEST_UNIT; i++) {
    const unit = new RequestUnit(manager, i);
    unitPull.push(unit);
    unit.start();
  }

  if (cliManager.isNeedLog) {
    console.log(`Start collect link to ${cliManager.url}`);
  }

  const intervalLength = cliManager.isNeedLog
    ? INTERVAL_DELAY_LOG
    : INTERVAL_DELAY_NO_LOG;

  const interval = setInterval(() => intervalCheck(interval), intervalLength);

  function intervalCheck(interval: Timer) {
    if (cliManager.isNeedLog) {
      manager.log();
    }

    if (manager.isEnd()) {
      clearInterval(interval);
      onEnd();
    }

    function onEnd() {
      if (cliManager.isNeedOutFile) {
        fileManager.write(
          cliManager.pathToOutFile,
          manager.getLinkListInText(),
        );
      } else {
        console.log(manager.getLinkListInText());
      }
    }
  }
})();
