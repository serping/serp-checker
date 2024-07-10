#!/usr/bin/env ts-node

import { exec } from 'child_process';
import chokidar from 'chokidar';
import path from 'path';
import { contentComponentsMarkdownDir } from '../i18n';

// Define the directory to watch
const contentDir = path.join(process.cwd(), contentComponentsMarkdownDir);

// Define the command to trigger
const command = 'npm run generate-markdown-data';

// Watch for changes in the directory
const watcher = chokidar.watch(contentDir, {
  persistent: true,
  ignoreInitial: true,
  ignored: /(^|[\/\\])\../, // Ignore dot files
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  }
});

// Function to run the command
const runCommand = () => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Command execution failed: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

// Set up the file watcher
watcher
  .on('add', (path) => {
    console.log(`File ${path} has been added`);
    runCommand();
  })
  .on('unlink', (path) => {
    console.log(`File ${path} has been removed`);
    runCommand();
  });

console.log(`Watching for changes in ${contentDir}`);
