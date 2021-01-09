import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import path from 'path';

import pkg from './package.json';
const { main, electronEntry, dependencies  } = pkg;

const external = Object.keys(dependencies);
const extensions = ['.js', '.json', '.ts'];
const entries = [
    {
        find: '~',
        replacement: path.resolve(__dirname, 'app'),
    }
]

const config = {
    input: electronEntry,
    output: {
        name: 'main',
        file: main,
        format: 'cjs',
    },
    external,
    plugins: [
        alias({
            entries
        }),
        resolve({
            extensions,
        }),
        json()
    ]
}

export default config;
