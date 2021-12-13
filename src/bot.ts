import { Client, CommandInteraction, Guild, GuildMember, GuildMemberRoleManager, Intents, Role } from "discord.js";
import { SECRET } from "./constants";
import { RoleSubcommand } from "./interface";

export class Bot {
	private readonly client = new Client({
		intents: [Intents.FLAGS.GUILD_INTEGRATIONS]
	})
	
	private get guild(): Guild {
		return this.client.guilds.cache.first() as Guild;
	}

	async init(): Promise<string> {
		this.client.on('ready', bot => console.log(`${bot.user.tag} is ready!`))
		this.client.on('interactionCreate', async interaction => {
			if (!interaction.isCommand()) return;
			this.resolveCommand(interaction)
		});
		return this.client.login(SECRET)
	}

	private async giveRole(interaction: CommandInteraction): Promise<void> {
		const memberRoles = interaction.member.roles as GuildMemberRoleManager
		const role = interaction.options.getRole('role') as Role

		try {
			await memberRoles.add(role, 'User requested this role')
		} catch (error) {
			console.error(error)
		}
	}

	private async removeRole(interaction: CommandInteraction): Promise<void> {
		await interaction.reply({ content: 'Not implemented yet!', ephemeral: true })
	}

	private async resolveCommand(interaction: CommandInteraction): Promise<any> {
		
		switch (interaction.commandName) {
			case 'role': {
				switch (interaction.options.getSubcommand()) {
					case RoleSubcommand.GIVE: {
						await this.giveRole(interaction)
						await interaction.reply({ content: 'Here you go!', ephemeral: true })
						break
					}
					case RoleSubcommand.REMOVE: {
						return this.removeRole(interaction)
					}
				}
				break;
			}
		}
	}
}