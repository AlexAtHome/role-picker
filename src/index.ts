import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Bot } from './bot'
import { commands } from './commands'
import { CLIENT_ID, GUILD_ID, SECRET } from './constants'

const rest = new REST({ version: '9' }).setToken(SECRET)

async function initCommands(): Promise<void> {
	await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
		body: [commands.toJSON()],
	})
	console.log('Successfully reloaded application (/) commands.')
}

new Bot().init().then(() => {
	console.log('Started refreshing application (/) commands.')
	return initCommands()
})
