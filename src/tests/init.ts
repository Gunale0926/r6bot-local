/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotenv from 'dotenv';
import { Card, KBotify } from '..';
dotenv.config();
// mod .env-template file
export const bot = new KBotify({
    mode: 'websocket',
    port: parseInt(process.env.KPORT!),
    token: process.env.TOKEN!,
    verifyToken: process.env.VERIFY,
    key: process.env.KEY,
    ignoreDecryptError: false,
    debug: false,
});
import { echoMenu } from 'commands/echo/echo.menu';
import { echoKmd } from 'commands/echo/echo.kmd.app';
import { testMenu } from 'commands/test/test.menu';
import { kBotifyLogger } from 'core/logger';
import { r6Menu } from 'commands/r6/r6.menu';
import { r6Active } from '../commands/r6/r6.active.app';
import { r6Applyrole } from '../commands/r6/r6.applyrole.app';
import { r6Record } from '../commands/r6/r6.record.app';
import { r6Search } from '../commands/r6/r6.search.app';
import { r6Team } from '../commands/r6/r6.team.app';
import { apexMenu } from '../commands/apex/apex.menu';
bot.addCommands(echoMenu, echoKmd, testMenu, r6Menu, apexMenu);
bot.connect();
bot.addAlias(r6Search, "查询")
bot.addAlias(r6Record, "记录")
bot.addAlias(r6Applyrole, "申请角色")
bot.addAlias(r6Team, "组队")
bot.addAlias(r6Active, "激活")
bot.logger.debug('system init success');
bot.messageSource.on('message', (e) => {
    //bot.logger.debug(`received:`, e);
});
var mysql = require('mysql');
var tabname = 'usrlib'
var list = [{
    chnname: 'DOC',
    chnid: 8574655462452796,
    userid: ['', '', '', '', ''],
    msgid: 'd97df35a-0211-40a2-ac36-f471daa47ea1',
    fnlid: 'e25cc721-9c9e-4af0-831f-8d4e0ed9c99b'
}, {
    chnname: 'FUZE',
    chnid: 7228978838660995,
    userid: ['', '', '', '', ''],
    msgid: '99f7c006-a892-4830-acb4-bc59a4c1d47f',
    fnlid: 'dc4153ec-126e-4d54-bc88-ca6884d54d75'
}, {
    chnname: 'ROOK',
    chnid: 8666873622418147,
    userid: ['', '', '', '', ''],
    msgid: '5ae91a26-c5d1-485a-9c59-c44e1591ebfe',
    fnlid: '431defd6-256e-43fd-8d9c-efb3ff484788'
}, {
    chnname: 'MUTE',
    chnid: 3671071360478648,
    userid: ['', '', '', '', ''],
    msgid: 'd9d8cfde-cfcf-404e-845b-3daf9750836f',
    fnlid: 'c180fbb9-39bc-4c3e-a727-08df0ae0a3fb'
}, {
    chnname: 'ORYX',
    chnid: 8099740112545843,
    userid: ['', '', '', '', ''],
    msgid: '49f8906e-646c-46af-88e7-af22220d5981',
    fnlid: 'ded76236-c4a5-47e7-998a-40388137c880'
}, {
    chnname: 'JAGER',
    chnid: 9853214616287407,
    userid: ['', '', '', '', ''],
    msgid: '7306b0cb-2203-44dc-b4c2-61692705b807',
    fnlid: '59a4b44d-6df7-44b5-aa3e-ada198060841'
}, {
    chnname: 'SLEDGE',
    chnid: 4522198069417620,
    userid: ['', '', '', '', ''],
    msgid: '6bab0d0e-49f9-4f27-9b94-06ce5f6e1238',
    fnlid: 'eb9b2b86-842d-45cc-af87-4cbe1692632f'
}, {
    chnname: 'WAMAI',
    chnid: 1505924438841986,
    userid: ['', '', '', '', ''],
    msgid: '07d8aafa-670d-4ec5-9841-54ef5229bd2a',
    fnlid: '5dfa5c00-86d7-46b1-a67b-a5102ff59cc8'
}, {
    chnname: 'TWITCH',
    chnid: 7769514269829865,
    userid: ['', '', '', '', ''],
    msgid: '0d657402-23d2-4df0-b690-aed2a31c19f4',
    fnlid: 'df6696cd-8ba0-40fa-b330-bcc4ee75a781'
}, {
    chnname: 'MOZZIE',
    chnid: 2494099237896157,
    userid: ['', '', '', '', ''],
    msgid: '1293b9d7-a7d8-47f0-9764-bd9e13210997',
    fnlid: '59a4b44d-6df7-44b5-aa3e-ada198060841'
}, {
    chnname: 'HIBANA',
    chnid: 3205552061241304,
    userid: ['', '', '', '', ''],
    msgid: '4d3a441f-8ce6-43a9-a851-5c6a6c3cb4bf',
    fnlid: 'c82dc832-c378-437c-a318-08e8325417f1'
}];
export var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '20060926Abc',
    database: 'bot_db'
});

async function searchid(id: string) {
    return new Promise<string>((resolve, reject) => {
        var exp = 'SELECT r6id FROM ' + tabname + ' WHERE id=' + id + ' && sel =1';
        connection.query(exp, function (err: any, result: any) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
            }
            result = JSON.parse(JSON.stringify(result))
            if (JSON.stringify(result).search('"r6id":"(.*?)"}') !== -1) {
                var r6id: string = JSON.stringify(result).match('"r6id":"(.*?)"}')[1];
                resolve(r6id);

            }
        });
    })
}

async function writeList(chnid: number, id: string) {
    return new Promise<void>((resolve, reject) => {
        for (var i = 0; i < Object.keys(list).length; i++) {
            if (list[i].chnid == chnid) {
                for (var j = 0; j < 5; j++) {
                    if (list[i].userid[j] == '') {
                        list[i].userid[j] = id;
                        resolve();
                        break;
                    }
                }
            }
        }
    })
}
async function deleteList(chnid: number, id: string) {
    return new Promise<void>((resolve, reject) => {
        for (var i = 0; i < Object.keys(list).length; i++) {
            if (list[i].chnid == chnid) {
                for (var j = 0; j < 5; j++) {
                    if (list[i].userid[j] == id) {
                        list[i].userid[j] = '';
                        resolve();
                        break;
                    }
                }
            }
        }
    })
}
bot.event.on('system', (event) => {
    if (event.type == 'joined_channel') {
        //console.log(event)
        var write = async function () {
            await writeList(event.body.channel_id, await searchid(event.body.user_id))
            await sendall(event.body.channel_id);
            console.log(list);
        }()
    }
    if (event.type == 'exited_channel') {
        //console.log(event)
        var del = async function () {
            await deleteList(event.body.channel_id, await searchid(event.body.user_id));
            await sendall(event.body.channel_id);
            console.log(list);
        }()

    }
    if (event.type == 'buttonClick') {
        var done = async function () {
            var channelId: string
            var clkusr: string;
            clkusr = await event.userId;
            if (event.value == 'DOC') channelId = '8574655462452796'
            if (event.value == 'FUZW') channelId = '7228978838660995'
            if (event.value == 'ROOK') channelId = '8666873622418147'
            if (event.value == 'MUTE') channelId = '3671071360478648'
            if (event.value == 'ORYX') channelId = '8099740112545843'
            if (event.value == 'JAGER') channelId = '9853214616287407'
            if (event.value == 'SLEDGE') channelId = '4522198069417620'
            if (event.value == 'WAMAI') channelId = '1505924438841986'
            if (event.value == 'TWITCH') channelId = '7769514269829865'
            if (event.value == 'MOZZIE') channelId = '2494099237896157'
            if (event.value == 'HIBANA') channelId = '3205552061241304'
            await bot.API.channel.moveUser(channelId, [clkusr])
        }()
    }
    async function sendall(inputid: number) {
        var https = require('https');
        var url = "https://r6.tracker.network/profile/pc/";
        var avmmr: number = 0, xmmr: number = 0, nmmr: number = 9999, num: number = 0, itm: number = 0;//因为先发送了一个header
        var rankable: boolean;
        var main = async function () {
            for (itm = 0; itm < Object.keys(list).length; itm++) {
                if (list[itm].chnid == inputid) {
                    break;
                }
            }
            /*await send([
                {
                    "type": "card",
                    "theme": "secondary",
                    "size": "lg",
                    "modules": [
                        {
                            "type": "section",
                            "text": {
                                "type": "kmarkdown",
                                "content": "**频道：" + name + "**"
                            }
                        }
                    ]
                }
            ])*/
            console.log(list)
            for (var j = 0; j < 5; j++) {
                if (list[itm].userid[j] != '') {
                    var r6id = List[itm].userid[j];
                    num++
                    var cards = await get(r6id)
                    var cardbind: object = Object.assign(cards, cardbind);
                }
            }
            if (!cardbind){
                await send([
                    {
                        "type": "card",
                        "theme": "secondary",
                        "size": "lg",
                        "modules": [
                            {
                                "type": "section",
                                "text": {
                                    "type": "kmarkdown",
                                    "content": "**当前频道无人**"
                                }
                            }
                        ]
                    }
                ], list[itm].msgid)
                return 0;
            }  
            await send(cardbind, list[itm].msgid);
            await final()
        }()
        async function send(card: object, id: string) {
            return new Promise<void>((resolve) => {
                var send = async function () {
                    //await bot.API.message.create(10, "2408081738284872", JSON.stringify(card));
                    await bot.API.message.update(id, JSON.stringify(card));
                    resolve()
                }()
            })
        }
        async function get(r6id: string) {
            return new Promise<object>((resolve, reject) => {
                var urln = url + r6id;
                https.get(urln, function (res: any) {
                    var html: string = '';
                    res.on('data', function (data: any) {
                        html += data;
                    });
                    res.on('end', function () {
                        if (html.indexOf("RankedKDRatio") !== -1) {
                            html = html.replace(/\n/g, '');
                            var mmr = html.match('<div class="trn-defstat__name">MMR</div><div class="trn-defstat__value">(.*?)</div>')[1].replace(',', '');
                            var rank = html.match('<div class="trn-defstat__name">Rank</div><div class="trn-defstat__value">(.*?)</div>')[1];
                            var kd = html.match('<div class="trn-defstat__value" data-stat="RankedKDRatio">(.*?)</div>')[1];
                            var imglink = '';//session.user.avatar
                            var namer = html.match('R6Tracker - (.*?) -  Rainbow Six Siege Player Stats')[1];
                            var arg1 = namer;
                            var arg2 = mmr;
                            var arg3 = rank.replace(' ', '');
                            var arg4 = kd;
                            var arg5 = imglink;
                            var arg6 = '#B2B6BB';
                            if (rank.search(/COPPER/) === 0) { arg6 = "#B30B0D"; }
                            if (rank.search(/BRONZE/) === 0) { arg6 = "#C98B3B"; }
                            if (rank.search(/SILVER/) === 0) { arg6 = "#B0B0B0"; }
                            if (rank.search(/GOLD/) === 0) { arg6 = "#EED01E"; }
                            if (rank.search(/PLATINUM/) === 0) { arg6 = "#5BB9B3"; }
                            if (rank.search(/DIAMOND/) === 0) { arg6 = "#BD9FF6"; }
                            if (rank.search(/CHAMPION/) === 0) { arg6 = "#9D385C"; }
                            var card: object = [{ "type": "card", "theme": "secondary", "color": arg6, "size": "lg", "modules": [{ "type": "section", "text": { "type": "kmarkdown", "content": "**" + arg1 + "**" }, "mode": "left" }, { "type": "section", "text": { "type": "paragraph", "cols": 3, "fields": [{ "type": "kmarkdown", "content": "**MMR**\n" + arg2 }, { "type": "kmarkdown", "content": "**段位**\n" + arg3 }, { "type": "kmarkdown", "content": "**赛季KD**\n" + arg4 }] } }] }]
                            var immr = parseInt(mmr)
                            avmmr = avmmr + immr;
                            if (xmmr < immr) xmmr = immr;
                            if (nmmr > immr) nmmr = immr;
                            resolve(card);//成功返回
                        }
                    });
                })
            })
        }
        async function final() {
            return new Promise<void>((resolve) => {
                avmmr = avmmr / num;
                if (xmmr - nmmr > 1000) rankable = false;
                else rankable = true;
                var card: object = [{
                    "type": "card",
                    "theme": "secondary",
                    "size": "lg",
                    "modules": [
                        {
                            "type": "section",
                            "text": {
                                "type": "plain-text",
                                "content": "Average MMR:" + avmmr
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "plain-text",
                                "content": "MMR Max Difference:" + (xmmr - nmmr)
                            }
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "plain-text",
                                "content": "是否可以排位：" + rankable
                            }
                        }
                    ]
                }]
                send(card, list[itm].fnlid);
                resolve();
            })
        }

    }
})
export var List = list;