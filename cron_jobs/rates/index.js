const CronJob = require('cron').CronJob;
const path = require('path');

async function init_job(bot, rate){

	console.log('init_job => cron_job_rates started ');
	return async function cron_job_rates(){
		console.log('cron_job_rates tick');
		let subscribers = await rate.get_subscribers();
		let rates = await rate.changes_rates();
		let rates_opt = await rate.changes_rates_opt();

		let inform = await rate.prepare_inform({subscribers, rates, rates_opt});

		for (chat_id in inform) {
			bot.sendMessage(chat_id, '<code>' + inform[chat_id] + '</code>', {
				disable_notification: true,
				disable_web_page_preview: false,
				parse_mode: 'HTML'
			})
		}
	}
}

module.exports.start = async function start(bot, rate){
	init_job = await init_job(bot, rate)
	return new CronJob({
		cronTime: '0 0,5,10,15,20,25,30,35,40,45,50,55 8-17 * * *',
		onTick: init_job,
		start: true,
		timeZone: 'Europe/Kiev',
		context: {}
	});
}
