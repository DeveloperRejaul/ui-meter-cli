import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs'],
    dts: true,
    clean: true,
    target: 'es6',
    onSuccess: 'cp -r ./src/fonts ./dist/fonts'
});