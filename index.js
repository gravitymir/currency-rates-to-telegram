let path = require('path');
require(path.join(__dirname, "..", "config.js"));

const bot = require(path.join(process.env.DIR, "auxmod", "telegram", "kitbitok"));
const rate = require(path.join(process.env.DIR, "auxmod", "rates", "index.js"));
let cron_job_rates = require(path.join(process.env.DIR, "cron_jobs", "rates"));
cron_job_rates.start(bot, rate);
