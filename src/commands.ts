import { SlashCommandBuilder } from '@discordjs/builders'
import { RoleSubcommand } from './interface'

export const commands = new SlashCommandBuilder()
	.setName('role')
	.setDescription('Gives or removes the role for you!')
	.addSubcommand(subcommand =>
		subcommand
			.setName(RoleSubcommand.GIVE)
			.setDescription('Gives you the specified role!')
			.addRoleOption(option => option.setName('role').setDescription('The role you want to get').setRequired(true))
	)
	.addSubcommand(subcommand =>
		subcommand
			.setName(RoleSubcommand.REMOVE)
			.setDescription('Removes the role from you')
			.addRoleOption(option => option.setName('role').setDescription('The role you want to lose').setRequired(true))
	)
