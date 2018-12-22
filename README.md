# three-learning

[demo](http://three-learning.eccyan.surge.sh/)

## Usage

Clone, `npm install`, then:

```sh
# start development server
npm run start
```

Now open [localhost:9966](http://localhost:9966/) and start editing your source code. Edit the `honey.frag` or `honey.vert` to see it reloaded without losing application state.

You can launch [localhost:9966/?gui](http://localhost:9966/?gui) to open dat.gui.

For production:

```sh
# create a production bundle.js
npm run bundle

# deploy to a surge link for demoing
npm run deploy
```

For deploy to work, you will need to change the surge URL in `package.json` `"scripts" > "deploy"` field to something else.

## License

This project forked from [mattdesl/threejs\-app](https://github.com/mattdesl)
MIT, see [LICENSE.md](http://github.com/mattdesl/threejs-app/blob/master/LICENSE.md) for details.
