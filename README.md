# PoeticMetric Tracker

[Manifesto](https://www.poeticmetric.com/manifesto?utm_source=github&utm_content=script&utm_term=manifesto) | [Docs](https://www.poeticmetric.com/docs?utm_source=github&utm_content=script&utm_term=docs) | [Blog](https://www.poeticmetric.com/blog?utm_source=github&utm_content=script&utm_term=blog) | [Twitter](https://twitter.com/PoeticMetricHQ)

[PoeticMetric](https://www.poeticmetric.com/?utm_source=github&utm_content=script&utm_term=description) is a privacy-first, regulation-compliant, blazingly fast analytics tool. And this is the source code of PoeticMetric's event tracker.

## Building

There is nothing much to build, really. [`index.js`](src/index.js) is already usable with almost all browser versions. We just minify it to reduce the file size.

```sh
$ yarn build
```

The build will create `poeticmetric.js` file in the `dist` folder. 

## License

Copyright © 2021, PoeticMetric. Released under the MIT License. See it [here](LICENSE).

