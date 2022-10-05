process
 .on('unhandledRejection', (reason, p) => {
    console.log(`Unhandled Rejection at Promise: ${reason}`);
 })
 .on('uncaughtException', err => {
    console.log(`Uncaught Exception thrown: ${err}`);
 });

require('dotenv').config();

const { BOT_TOKEN, TEST_TOKEN, MONGODB_URI, ADMIN_ID } = process.env;
const {Telegraf, Scenes: {Stage}} = require('telegraf')

const {MongoClient} = require('mongodb')
const {session} = require('telegraf-session-mongodb')

const fs = require('fs')
const fsp = fs.promises;

// commands
const start = require('./commands/start')
const stats = require('./commands/stats')

// scenes 
const shiftScene = require('./scenes/shift')
const weekdaysScene = require('./scenes/weekdays')
const sheduleScene = require('./scenes/shedule')
const buildingScene = require('./scenes/building')
const donateScene = require('./scenes/donate')
const distributionScene = require('./scenes/distribution')
const settingsScene = require('./scenes/settings')

// services 
const tableScreener = require('./services/tableScreener')
// init

setInterval(tableScreener(), 3600000)

const init = async (bot) =>{
    const stage = new Stage([
        shiftScene, 
        weekdaysScene, 
        sheduleScene, 
        buildingScene, 
        donateScene, 
        distributionScene, 
        settingsScene,
        
    ]);
    const db = (await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })).db();
    bot.use(session(db));
    bot.use(stage.middleware())
    bot.command('start', start())
    bot.command('stats', stats())
    bot.command('updateShedule', tableScreener())
    bot.command('settings',(ctx)=>ctx.scene.enter('settings'))
    
    bot.command('distribution', (ctx, db)=>{
        console.log(ctx.session.userId)
        if(ctx.session.userId == ADMIN_ID){
            ctx.scene.enter('distribution')
        }
        else{
            return ctx.reply('У вас нет прав доступа для пользования этой коммандой!')
        }
    })
    
    // default scene values
    bot.action(/[A-z]+$/, (ctx) => {
        var userAction = ctx.match[0]
        //console.log(userAction)
        switch (userAction){
            case 'UserBuildingA':
                ctx.session.userBuilding = 'A'
                ctx.scene.enter('shift')
                break
            case 'UserBuildingB':
                ctx.session.userBuilding = 'B'
                ctx.scene.enter('shift')
                break
            case 'userWeekdayToday':
                ctx.scene.enter('shedule', {'option':'today'})
                break
            case 'userWeekdayTomorrow':
                ctx.scene.enter('shedule', {'option':'tomorrow'})
                break
            case 'changeSettings':
                ctx.scene.enter('settings')
                break
            case 'changeWeekday':
                ctx.scene.enter('weekdays')
                break
            case 'supportAuthor':
                ctx.scene.enter('donate')
                break
            
            

            
        }
    })
    return bot
}

init(new Telegraf(TEST_TOKEN, { polling: true }), process.env).
then(async(bot)=> {
    await bot.launch()
    console.log(`Launched ${new Date}`)
})

module.exports = init
