# webpack-webapp

Webpack frontend web app starter.  
Includes: Hosting(gh-pages), Testing(Jest), CICD(Husky, GitHub Actions, Docker), Docs (.adoc), asset handling(Images, Videos, Audios, Fonts...), TypeScript, Sass, TailwindCSS, Web Components(lit), Component Library(shoelace).  
The goal is to keep the bundle size as small as possible but still have a decent developer experience.

## Workflow

### Images, Videos, Audios, Fonts (`public/lib/assets`)
You could also put them inside of `public/static` and import them with `/<asset_name>`, but if you do so, caching might cause you headaches.  
(if in `public/lib/assets` the assets are given a unique hash at build time, if in `public/static` they are just copied to the root of the build folder)

### Icons
Shoelace comes with a lot of icons: https://shoelace.style/components/icon.

### Components (`public/lib/components`)

#### Custom(Lit)

Reusable elements (components) should be written in TypeScript for type safety.  
They are then imported into the `<page_name>.html` file as follows:

```html
<script type="module" src="bundle.<component-name>.js" defer></script>
<component-name></component-name>
```

#### Shoelace

If you don't want to use shoelace, you can delete the `shoelace` folder, delete the following in your `webpack.config.js` file to reduce the bundle size:

```js
module.exports = {
    ...
    plugins: [
        ...
        new CopyPlugin({
            patterns: [
                {
                from: path.resolve(
                    __dirname,
                    'node_modules/@shoelace-style/shoelace/dist/assets',
                ),
                to: path.resolve(__dirname, 'dist/shoelace/assets'),
                },
            ],
        }),
        ...
    ]
    ...
}
```

##### Importing Shoelace Components in your <page_name>.js files

```js
// ShoelaceUI
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import '@shoelace-style/shoelace/dist/components/<component_name>/<component_name>.js';
import {setBasePath} from '@shoelace-style/shoelace/dist/utilities/base-path.js';
setBasePath('/dist/shoelace');
```

##### Using Shoelace Components in your <page_name>.html files

```html
<sl-<component_name>></sl-<component_name>>
```

### Scripts (`public/lib/script`)
Page-specific scripts in `public/lib/script/pages`.

#### How to Use Them?
```js
module.exports = {
    // INFO: include the script in the build
    ...
    entry: {
        ...
        <page_name>: './public/lib/script/pages/<page_name>.js',
        ...
    },
    ...

    // INFO: import the `script/pages` script in its html template
    plugins: [
        ...
        new HtmlWebpackPlugin({
            filename: '<page_name>.html',
            template: 'public/routes/<page_name>.html',
            chunks: ['<page_name>'], // only include the '<page_name>' chunk
        }),
        ...
    ]
    ...
}
```

### Styles (`public/lib/style`)
[Tailwind](https://tailwindcss.com/) extensions in `main.css`.  
**Suggestion**: Custom CSS in [SCSS](https://sass-lang.com/documentation/syntax/) syntax and [BEM](https://getbem.com/introduction/).  
General custom CSS: `style.scss`  
Component Specific/Custom Class: `<component/custom_class>.scss`

### Routes/Static Sites, Templates (`public/routes`)
This is where you put your HTML templates.  
Pure HTML only, no JS, and no CSS (except for TailwindCSS classes).

### Static Elements (robots.txt, favicon.ico...) (`public/static`)
These are moved to the root of the `dist` folder.

### Docs (`docs`)
You can write them in AsciiDoc format.  
They are automatically converted to HTML and moved to the root of the `dist/docs` folder.

### NPM Packages
Don't forget to install the dependencies with `--save-dev` or `-D` if they are only used for development.  
Production dependencies should be as slim as possible, because that is the goal of using webpack and not some large framework.  
(Currently only Express as the NodeJS server and Cors for setting Cors headers for the backend is installed as a production dependency.)

## CICD

### GitHub Actions
The workflow is defined in `.github/workflows/cicd.yml`.
It is triggered on every push to the `main` branch.  

**jobs**: 
* `test-and-build-frontend`,
* `push-frontend-to-docker-hub` (don't forget to set ``DOCKERHUB_USERNAME`` and ``DOCKERHUB_TOKEN`` as secrets  
in the repo settings AND change the image name in the workflow file to your own (example: <username/app_name:latest>).),
* `publish-frontend-to-github-pages`

### Locally (Husky)
A `pre-commit` hook is defined in `.husky/pre-commit` (formats code).  
A `pre-push` hook is defined in `.husky/pre-push` (lints code).  
You can disable them by adding `--no-verify` to your commit/push command or by deleting  
the `.husky` folder or you could simply update the file to your liking.

## Build Config (`webpack.config.js`)
You can find the build config in `webpack.config.js`.

## Testing

### Jest
You can find the Jest config in `jest.config.js`.  
You can write the Jest tests in `public/lib/script/__tests__`.

## Commands (`package.json(.scripts)`)

Start Webpack development server:
```bash
npm dev
```
Build/bundle for production:
```bash
npm build
```
Preview the bundle:
```bash
npm preview
```
