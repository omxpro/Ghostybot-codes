const Discord = require("discord.js");

const db = require("quick.db");

module.exports = {

  name: "snipe",

  category: "misc",

  usage: "snipe",

  description: "get deleted messages",

  run: async (client, message, args) => {

    const msg = client.snipe.get(message.channel.id);

    if (!msg)

      return message.channel

        .send("There are no deleted messages in this channel!")

        .then(m => {

          m.react("🔄");

        });

    const embed = new Discord.MessageEmbed()

      .setTitle("📋Snipe Message Delete📋")

      //  .setAuthor(msg.author)

      .setDescription(

        `=> Author: \`\`\`

${msg.author}

\`\`\`

 => Message Delete: 

\`\`\`

${msg.content || "Tell That No Response To Embed"}

\`\`\`

Clink :x: to clear this message`

      )

      .setTimestamp()

      .setColor("GREEN");

    if (msg.image) embed.setImage(msg.image);

    message.channel.send(embed).then(m => {

      m.react("✄1�7");

      m.react("❄1�7");

    const filter = (reaction, user) => {

            return (

                ["❄1�7", "✄1�7"].includes(reaction.emoji.name) &&

                user.id === message.author.id

            );

        };

        m.awaitReactions(filter, { max: 1, time: 300000, errors: ["time"] }).then(collected => {

        const reaction = collected.array()[collected.size - 1]

            if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.

        if (reaction.emoji.name === "❄1�7") {

          m.delete();

        }

      })})}};

      // message.channel.send("If there is a new delete message, you can use this command").then(m=>m.delete({timeout:12000}).catch(e=>{}))

      // }})}})

    /*====================================================================*/

//<COMMANDS SNIPE>

client.snipe = new Map();

client.on("messageDelete", function(message, channel) {

  client.snipe.set(message.channel.id, {

    content: message.content,

    author: message.author.tag,

    image: message.attachments.first()

      ? message.attachments.first().proxyURL

      : null

  });

});

/*====================================================================*/

