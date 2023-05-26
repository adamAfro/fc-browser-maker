# Wordlcloud

**Functionalities**:

- [x] selecting any node of a website to do stuff on it
    - right now it just counts words 
- [x] drawing basic worldcloud based on _wordcount_
    - it sucks more or less: need to handle TODOs in `cloud.ts`
- [ ] ability to select place where wordcloud should be placed

## Build `src` into `index.js`

```
tsc; esbuild bundle/index.js --outfile=index.js --bundle
```