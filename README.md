# vue-project

Vue 3 + Vite + Element Plus 主应用，内置 `@gcvin/my-component` 组件库（workspace 子包）与 qiankun 微前端示例。

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

`pnpm install` 会自动通过 `prepare` 脚本构建组件库（输出到子包的 `es`/`lib`/`dist`）。
若跳过构建，可手动执行：

```sh
pnpm mc:build
```

注意：组件库的构建产物已加入 `.gitignore`，开发前需确保其存在（`pnpm install` 或 `pnpm mc:build`）。

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### 组件库测试

```sh
pnpm mc:test
```
