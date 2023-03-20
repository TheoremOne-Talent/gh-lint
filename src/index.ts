#!/usr/bin/env node
import { program as ghlint } from 'commander';
import lint from './commands/lint';

ghlint.name('ghlint').version('0.1.0').addCommand(lint);

ghlint.parse(process.argv);
