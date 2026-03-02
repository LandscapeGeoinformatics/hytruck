# HyTruck Web single page app (spa)

Frontend of the Spatial Planning Toolkit  application

## Install the dependencies

```bash
# yarn install
yarn install --no-immutable

# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```


### Lint the files

```bash
yarn lint
# or
npm run lint
```


### Format the files

```bash
yarn format
# or
npm run format
```


### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).

### Build the app for production

```bash
# Variable to store the latest git hash
githash := `git log -1 --format=format:"%H" | cut -c1-8`

# Active branch
active_branch := `git branch | grep "*" | sed "s/* //"`

# Update buildinfo.js with git hash
if [ -f src/boot/buildinfo.js ]; then \
    sed -i.bak "s/__BUILDINFO__/{{githash}}/" src/boot/buildinfo.js; \
else \
    echo "Cannot update src/boot/buildinfo.js"; \
fi


quasar build

# or
./node_modules/.bin/quasar build
```

