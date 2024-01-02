#!/usr/bin/env node

// Importing the required functions for each command
import addItem from './commands/addItem.js'
import deleteItem from './commands/deleteItem.js'
import readItem from './commands/readItem.js'
import updateItem from './commands/updateItem.js'
import searchItem from './commands/searchItem.js'
import setItem from './commands/setItem.js'

// Importing the Command class from Commander.js library
import { Command } from 'commander'

// Creating an instance of the Command class
const program = new Command()

// Setting the name and description of the CLI tool
program
.name('ecom')
.description('Your e-commerce terminal!')
.version('1.0.0')

// Defining a command called 'add'
program
.command('add')
.description('Create a new products.')
.action(addItem)

// Defining a command called 'read'
program
.command('read')
.description('Reads all the products.')
.action(readItem)

// Defining a command called 'update' that updates a whole product.
program
.command('update')
.description('Updates a product.')
.action(updateItem)

// Defining a command called 'delete'
program
.command('delete')
.description('Deletes a product.')
.action(deleteItem)

// Defining a command called 'update'
program
.command('search')
.description('Searches a product.')
.requiredOption('-k, --key <type>', 'the key that is used to search item')
.requiredOption('-v, --value <value...>', 'the value that is used to search item')
.option('--range')
.action(searchItem)

// Defining a command called 'set'
program
.command('set')
.description('Sets a parameter for a single or multiple product.')
.requiredOption('-i, --id <id...>', 'the ids that need to be updated')
.requiredOption('-k, --key <type>', 'the key that need to be updated')
.requiredOption('-v, --value <type>', 'new key value')
.action(setItem)

// Parsing the command-line arguments and executing the corresponding actions
program.parse()