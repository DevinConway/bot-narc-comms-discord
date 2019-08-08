const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {

    message.delete(1);

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
        const user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        const mRole = message.member.guild.roles.find('name', '-= MUTED =-');
    
        if(!user) {
            message.channel.send(`***__ERROR__***\nYou must enter a user, ${message.author.toString()}`);
            return;
        }
    
        const success = new Discord.RichEmbed()
            .setAuthor('Done!')
            .setDescription(`${user} has been unmuted! ${emoji('602343210374922281')}`)
            .setColor('#386e36')
        message.channel.send(success)
            .then(msg => {
                msg.delete(3000);
            });
    
        user.removeRole(mRole);
    
    }
}


module.exports.help = {
    name: "unmute"
}