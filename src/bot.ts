import { Client, CommandInteraction, Intents } from 'discord.js'
import { isNil } from 'lodash'
import { ROLE_IDS, SECRET } from './constants'
import { RoleSubcommand } from './interface'

export class Bot {
	private readonly client = new Client({
		intents: [Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILDS],
	})

	async init(): Promise<string> {
		return this.client
			.on('ready', bot => console.log(`${bot.user.tag} is ready!`))
			.on('interactionCreate', async interaction => {
				if (interaction.isCommand()) {
					return this.resolveCommand(interaction as CommandInteraction<'cached'>)
				}
			})
			.login(SECRET)
	}

	private async giveRole(interaction: CommandInteraction<'cached'>): Promise<void> {
		const role = interaction.options.getRole('role')
		let content: string

		if (isNil(role)) {
			content = `Cannot find such role!`
		} else if (!ROLE_IDS.includes(role.id)) {
			content = ':warning: Nope! You can\'t have it! No-no-no!'
		} else if (role.members.has(interaction.member.id)) {
			content = ':warning: Nope! You already have this role.'
		} else {
			await interaction.member.roles.add(role)
			content = `:white_check_mark: You now have the role ${role.toString()}!`
		}

		await interaction.reply({
			ephemeral: true,
			content
		})
	}

	private async clearRoles(interaction: CommandInteraction<"cached">): Promise<void> {
		await interaction.member.roles.remove(ROLE_IDS)
		await interaction.reply({ content: 'All user set roles have been taken from you.', ephemeral: true })
	}

	private async resolveCommand(interaction: CommandInteraction<'cached'>): Promise<void> {
		if (interaction.commandName === 'role') {
			try {
				switch (interaction.options.getSubcommand()) {
					case RoleSubcommand.GIVE: {
						return this.giveRole(interaction)
					}
					case RoleSubcommand.CLEAR: {
						return this.clearRoles(interaction)
					}
				}
			} catch(error) {
				await interaction.reply({
					content: ':boon: An error occured. Try again later or contact the admin',
					ephemeral: true
				})
			}
		}
	}
}
