import path from "path";
import fs from "fs";
import { dirname } from 'dirname-filename-esm';
import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import Users from '../../../model/user.js';
import Profiles from '../../../model/profiles.js';
import destr from "destr";
export const data = new SlashCommandBuilder()
    .setName('addallname')
    .setDescription('Allows you to give a user all cosmetics via their username.')
    .addStringOption(option => option.setName('username')
    .setDescription('The username of the user you want to give all cosmetics to')
    .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.MentionEveryone)
    .setDMPermission(false);
export async function execute(interaction) {
    const __dirname = dirname(import.meta);
    let username = interaction.options.getString('username');
    const user = await Users.findOne({ username_lower: username?.toLowerCase() });
    if (!user)
        return interaction.reply({ content: "That user does not own an account", ephemeral: true });
    const profile = await Profiles.findOne({ accountId: user.accountId });
    if (!profile)
        return interaction.reply({ content: "That user does not have a profile", ephemeral: true });
    const allItems = destr(fs.readFileSync(path.join(__dirname, "../../../../Config/DefaultProfiles/allathena.json"), 'utf8'));
    if (!allItems)
        return interaction.reply({ content: "Failed to parse allathena.json", ephemeral: true });
    Profiles.findOneAndUpdate({ accountId: user.accountId }, { $set: { "profiles.athena.items": allItems.items } }, { new: true }, (err, doc) => {
        if (err)
            console.log(err);
    });
    user.GivenFullLocker = true;
    await interaction.reply({ content: "Successfully added all skins to the selected account", ephemeral: true });
}
//# sourceMappingURL=addallname.js.map