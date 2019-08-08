const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {

    message.delete(1);

    const issuer = message.member;
    const issuerN = message.member.displayName;
    const mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    const logChannel = client.channels.find('name', 'bot-logs');
    const reason = args.join(" ").slice(22);
    const mRole = message.member.guild.roles.find('name', '-= MUTED =-'); 
    function emoji (id) {
        return client.emojis.get(id).toString();
    }

    if(!message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.send(`***__ERROR__***\nYou do not have permission to use this command, ${message.author.toString()}`)
            .then(msg => {
                msg.delete(5000);
            });
        return;
    }

    if(message.member.hasPermission('ADMINISTRATOR')) {

        if (!mRole) {
            message.channel.send(`***__ERROR__***\nThe "-= MUTED =-" role could not be found\nPlease ensire that you have done \`mod!setup\`${message.author.toString()}`)
                .then(msg => {
                    msg.delete(5000);
                });
            return;
        }
        if(!mUser) {
            message.channel.send(`***__ERROR__***\nYou must enter a user, ${message.author.toString()}`)
                .then(msg => {
                    msg.delete(5000);
                });
            return;
        }
        if(!reason) {
            message.channel.send(`***__ERROR__***\nYou must enter a reason, ${message.author.toString()}`)
                .then(msg => {
                    msg.delete(5000);
                });
            return;
        }

        const success = new Discord.RichEmbed()
            .setAuthor('Done!')
            .setDescription(`${mUser} has been muted! ${emoji('602343210374922281')}`)
            .setColor('#386e36')
        message.channel.send(success)
            .then(msg => {
                msg.delete(3000);
            });

        const logEmbed = new Discord.RichEmbed()
            .setAuthor(`"${issuerN}" used mute`, message.author.displayAvatarURL)
            .addField('Person Muted:', `${mUser}`, true)
            .addField('Muted By:', `${issuer}`, true)
            .addField('Muted For:', `${reason}`, true)
            .addField('Muted in Channel:', `${message.channel}`, false)
            .setColor('RED')
    
        mUser.addRole(mRole);
        logChannel.send(logEmbed)

    }

}


module.exports.help = {
    name: "mute"
}