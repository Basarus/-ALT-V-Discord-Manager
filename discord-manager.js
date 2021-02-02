import alt from 'alt-server';
import { createRequire } from 'module';
import chalk from 'chalk';
import { registerCmd } from '../chat';

const require = createRequire(import.meta.url);
const Discord = require('discord.js');
const client = new Discord.Client();

client.login('ODA2MDgwOTg4MDkzNjEyMDMy.YBkPaw.FAY3ByZp2E6sCy8TE7fR4l7P2Tc');

console.log(chalk.cyanBright('Discord Connect!'));


let reports = [];

registerCmd('report', '', report);

function report(player, args) {

    client.channels.cache.get('806149305772539933').send({
        embed: {
            color: 3447003,
            author: {
                name: `Report №${reports.length}`
            },
            title: `[${player.id}] ${player.name}`,
            description: args.join(' '),
            timestamp: new Date()
        }
    })

    reports.push({
        id: player.id,
        date: new Date(),
        text: args.join(' '),
        status: false
    })

    player.send(`Вы отправили репорт, ожидайте ответа администрации!`)
}

client.on('message', message => {
    if (message.content[0] === '!') {
        let text = message.content.split(' ');
        let id = text[1];
        if (isNaN(id)) return client.channels.cache.get('806149305772539933').send('Используй форму: !answer <id report> <answer>');
        if (text[0] === '!answer' && reports[id] != undefined) {
            alt.Player.all.map(player => {
                if (player.id == reports[id].id) {
                    text.splice(0, 2)
                    player.send(`{FF0000} Ответ на репорт: ${text.join(' ')}`)
                    reports.splice(id, 1)
                } else client.channels.cache.get('806149305772539933').send('Такого репорта не существует!');
            })
        }
    }
})