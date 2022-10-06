const Mustache = require('mustache');
const fs = require('fs');
const dayjs = require('dayjs');
const RelativeTime = require('dayjs/plugin/relativeTime');
const UTC = require('dayjs/plugin/utc')
const Timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
const MUSTACHE_MAIN_DIR = './main.mustache';

dayjs.extend(UTC);
dayjs.extend(Timezone);
dayjs.extend(RelativeTime);
dayjs.tz.setDefault('America/Denver');

/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
*/
let DATA = {
  today: dayjs().format('dddd, MMMM D'),
  timeCoding: dayjs('2011-01-03').toNow(true),
};

/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}
generateReadMe();