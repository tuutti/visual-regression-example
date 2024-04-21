const processArgs = process.argv.slice(2);
const backstopjs = require('backstopjs');

// Upload test reports to web/sites/backstop by default.
const reportBasePath = 'web/sites/backstop';
// The Drupal hostname. This should be whatever domain you use to access the Drupal
// in your browser.
const hostname = 'visual-regression-example.docker.so';
const reportUrl = `https://${hostname}/sites/backstop/html_report/index.html`;


const removeDefault = [
  'iframe',
];
// Define your test scenarios here.
let scenarios = [
  {
    'label': 'Landing page',
    'url': `https://${hostname}/user`,
    'removeSelectors': removeDefault
  }
];

// Define your breakpoints here.
let viewports = [
  {
    'label': 'Breakpoint_XS',
    'width': 320,
    'height': 450
  },
  {
    'label': 'Breakpoint_XL',
    'width': 1024,
    'height': 580
  },
  {
    'label': 'Breakpoint_XXL',
    'width': 2560,
    'height': 1440
  }
];

const config = {
  // Add filter for label string here if you want to debug a single component, like
  // the events component.
  filter: processArgs[2] ?? null,
  config: {
    'viewports': viewports,
    'scenarios': scenarios,
    'mergeImgHack': true,
    'onBeforeScript': 'onBefore.js',
    'paths': {
      'bitmaps_reference': `${reportBasePath}/bitmaps_reference`,
      'bitmaps_test': `${reportBasePath}/bitmaps_test`,
      'engine_scripts': `backstop/`,
      'html_report': `${reportBasePath}/html_report`,
      'ci_report': `${reportBasePath}/ci_report`
    },
    'report': ['browser'],
    'engine': 'playwright',
    'engineOptions': {
      'browser': 'chromium',
    },
    'asyncCaptureLimit': 10,
    'asyncCompareLimit': 100,
    'debug': false,
    'debugWindow': false,
    'hostname': `${hostname}`,
  }
};

const commandMap = {
  reference: 'reference',
  test: 'test',
  approve: 'approve',
};

let command;
if (processArgs.includes(commandMap.reference)) {
  command = commandMap.reference;
} else if (processArgs.includes(commandMap.test)) {
  command = commandMap.test;
} else if (processArgs.includes(commandMap.approve)) {
  command = commandMap.approve;
} else {
  throw new Error('Missing a known command');
}

backstopjs(command, config)
  .then(() => {
    console.log(`The ${command} command was successful! Check the report here: ${reportUrl}`);
  }).catch((e) => {
  process.exitCode = 255;
  console.error('\n\n📕 ', e, `\n\nCheck the report:\n🖼️  ${reportUrl}`);
});
