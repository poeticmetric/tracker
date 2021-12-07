# PoeticMetric Tracker

[Manifesto](https://www.poeticmetric.com/manifesto?ref=https://github.com/poeticmetric/tracker) | [Docs](https://www.poeticmetric.com/docs?ref=https://github.com/poeticmetric/tracker) | [Blog](https://www.poeticmetric.com/blog?ref=https://github.com/poeticmetric/tracker) | [Twitter](https://twitter.com/PoeticMetricHQ)

[PoeticMetric](https://www.poeticmetric.com/?ref=https://github.com/poeticmetric/tracker) is a privacy-first, regulation-compliant, blazingly fast analytics tool. And this is the source code of PoeticMetric's event tracker.

## Building

There is nothing much to build, really. [`index.js`](src/index.js) is already usable with almost all browser versions. We just minify it to reduce the file size.

```sh
$ yarn build
```

The build will create `poeticmetric.js` file in the `dist` folder. 

## License

Copyright © 2021, PoeticMetric. Released under the MIT License. See it [here](LICENSE).

