declare type WriteParam = [PathLike, string];
declare type WritePort = (...params: WriteParam) => Promise<void>;
