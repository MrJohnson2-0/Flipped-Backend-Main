import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import Users from '../../../model/user.js';
import mmcodes from '../../../model/mmcodes.js';
export const data = new SlashCommandBuilder()
    .setName('deletecode')
    .setDescription('Deletes a custom matchmaking code')
    .addStringOption(option => option.setName('code')
    .setDescription('The code you want to delete')
    .setRequired(true));
export async function execute(interaction) {
    try {
        const user = await Users.findOne({ discordId: interaction.user.id });
        if (!user)
            return interaction.reply({ content: "You are not registered!", ephemeral: true });
        if (!user.canCreateCodes)
            return interaction.reply({ content: "You are not allowed to create or delete codes!", ephemeral: true });
        const code = interaction.options.getString('code');
        const codeExists = await mmcodes.findOne({ code_lower: code.toLowerCase() }).populate("owner");
        if (!codeExists)
            return interaction.reply({ content: "This code doesn't exist", ephemeral: true });
        //@ts-expect-error ???
        if (codeExists.owner?.discordId !== interaction.user.id)
            return interaction.reply({ content: "You are not the owner of this code", ephemeral: true });
        await mmcodes.deleteOne({ code_lower: code.toLowerCase() });
        const embed = new EmbedBuilder()
            .setTitle("Code deleted")
            .setDescription(`Your code \`${code}\` has been deleted`)
            .setColor("#2b2d31")
            .setFooter({
            text: "Flipped",
            iconURL: "https://cdn.discordapp.com/attachments/1175237541327274075/1175251623648444487/2fa0a9db5ad78bda424099711c3c410a.png?ex=656a8d5e&is=6558185e&hm=2427e70783c0587c1706cdaa969d4824bb5ae5e3f5e586bb33b3883db6c804f7&",
        })
            .setTimestamp();
        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    catch (err) {
        await interaction.reply({ content: "An error occured while deleting your code. Please try again later.", ephemeral: true });
    }
}
//# sourceMappingURL=deletecode.js.map