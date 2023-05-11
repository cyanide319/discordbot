require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'hey',
        description: 'Replies with hey !',
    },
    {
        name: 'roll',
        description: 'roll ?d?',
        options: [
            {
                name: 'dice',
                description: '?d?',
                type: ApplicationCommandOptionType.String,
                require: true,
            },
            // {
            //     name: 'y',
            //     description: 'Number of faces on the dices',
            //     type: ApplicationCommandOptionType.Number,
            //     choices: [
            //         { name: 'd2', value: 2, },
            //         { name: 'd4', value: 4, },
            //         { name: 'd6', value: 6, },
            //         { name: 'd10', value: 10, },
            //         { name: 'd20', value: 20, },
            //         { name: 'd100', value: 100, },],
            //     require: true,
            // },
        ]
    },
];

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Requesting slash command...');

        await rest.put(
            Routes.applicationGuildCommands(
            process.env.CLIENT_ID,
            process.env.GUILD_ID),
            { body: commands }
        );

        console.log('slash command received!');
    } catch (error){
        console.log(`There was an error: ${error}`);
    }
})();