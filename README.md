# TStractor
This project implements a simple utility for collecting all the internal pages of the site. At the entrance, it takes the URL of the site, and returns a list of all the links that were found as a result of the crawl.
When crawling, a pool of requests is supported, so the collection is quite fast, almost all sites in seconds. The maximum number of requests in the pool can be adjusted.

## Runtime
This project supports the [Bun](https://bun.sh/) and [Deno](https://deno.com/) runtime environments. Node JS is not supported by default. , since I'm too lazy to build ts).

## Example

### Deno
```npm run start:deno https://stackoverflow.com/ -- -l```
### Bun
```npm run start:bun https://stackoverflow.com/ -- -l```

## Params
`-o` - Output in file. After it, you need to specify the path for the file;
`-l` - Print logs;
`-t` - Target url for collection.
