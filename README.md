# Dashsight + CrowdNode + Vue 3 + Vite

## Demo
https://dashsight-vite-example.netlify.app/

## Usage
To test this repository, do the following

```sh
git clone https://github.com/dashhive/dashsight-vite-example.git
cd dashsight-vite-example
npm install
npm run dev
```

## Videos

See how it was made with the videos

[![Making of DashSight Vite Example](https://img.youtube.com/vi/yVX-T-ktIWY/0.jpg)](https://youtu.be/yVX-T-ktIWY?t=182)

### How to generate a similar project with Vite template

```sh
npm create vite@latest vue -- --template vue
cd vue
npm install --save dashsight@1.1.0-0
npm i
npm run dev
```

Changed HelloWorld.vue component to [GetBalance.vue](./src/components/GetBalance.vue), imported Dashsight into the component.

## Testing Dashsight with Vue Vite Boilerplate
[Dashsight.js Issue 10](https://github.com/dashhive/dashsight.js/issues/10)
