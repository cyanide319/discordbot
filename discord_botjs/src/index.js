require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === 'hello') {
    message.reply('Bon matin');
  }
});

client.on('interactionCreate', async (interaction) =>{
  if (!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'hey'){
    await interaction.reply('hey!');
  }

  if(interaction.commandName === 'roll'){
	try {
		const str = interaction.options.get('dice').value;
		
		i = 1;
		sum = 0;
		const rolls = [];
		
		try {
			const num = str.split('d');
			const num1 = parseInt(num[0]);
			const num2 = parseInt(num[1]);
			if (isNaN(num1)) {
				await interaction.reply(`Wrong input! Try for exemple: /roll 5d20`);
				console.log("The first element is not a valid integer.");
				return ;
			}
			if (isNaN(num2)) {
				await interaction.reply(`Wrong input! Try for exemple: /roll 5d20`);
				console.log("The fsecond element is not a valid integer.");
				return ;
			}
			while (i <= num1){
				try {
					randomInt = Math.floor(Math.random() * num2) + 1;
					sum += randomInt;
					rolls.push(randomInt); // Push roll result to the array
				} catch (error) {
					await interaction.reply(`Wrong input! Try for exemple: /roll 5d20`);
					console.log(`An error occurred: ${error.message}`);
					return ;
				}
				i++;
			}
			
			try {
				await interaction.reply(`You rolled ${num1}D${num2} and got (${rolls.join(' + ')}) = ${sum}`);
			} catch (error) {
				await interaction.reply(`Wrong input! try for exemple: /roll 5d20`);
				console.log(`An error occurred: ${error.message}`);
				return ;
			}
		} catch (error) {
			await interaction.reply(`Wrong input! Try for exemple: /roll 5d20`);
			console.log(`An error occurred: ${error.message}`);
			return ;
		}
	} catch (error) {
		await interaction.reply(`Wrong input! Try for exemple: /roll 5d20`);
		console.log(`An error occurred: ${error.message}`);
		return ;
	}
  }
  console.log(interaction.commandName);
}
);

client.login(process.env.DISCORD_TOKEN);