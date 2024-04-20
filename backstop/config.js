const processArgs = process.argv.slice(2);
const backstop = require('backstopjs');

const COMMAND = {
  REFERENCE: 'reference',
  TEST: 'test',
  APPROVE: 'approve',
};

const removeDefault = [
  'iframe',
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

// Upload test reports to web/sites/backstop by default.
const reportBasePath = 'web/sites/backstop';
// The hostname. This should be whatever domain you use to access the Drupal
// in your browser.
const hostname = 'visual-regression-example.docker.so';

// Define your test scenarios here.
let scenarios = [
  {
    'label': 'Landing page',
    'url': `https://${hostname}/user`,
    'removeSelectors': removeDefault
  }
];

const config = {
  // Add filter for label string here if you want to debug a single component, like the
  // events component.
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
      'html_report': `${reportBasePath}/backstop/html_report`,
      'ci_report': `${reportBasePath}/backstop/ci_report`
    },
    'report': ['browser'],
    'engine': 'playwright',
    'engineOptions': {
      'browser': 'chromium',
      'args': ['--no-sandbox'],
    },
    'asyncCaptureLimit': 10,
    'asyncCompareLimit': 100,
    'debug': false,
    'debugWindow': false,
    'hostname': `${hostname}`,
  }
};

let command;
if (processArgs.includes(COMMAND.REFERENCE)) {
  command = COMMAND.REFERENCE;
} else if (processArgs.includes(COMMAND.TEST)) {
  command = COMMAND.TEST;
} else if (processArgs.includes(COMMAND.APPROVE)) {
  command = COMMAND.APPROVE;
} else {
  throw new Error('Missing a known command');
}

backstop(command, config)
  .then(() => {
    if(command === COMMAND.REFERENCE) {
      console.log(`\n\n📗 Created reference images.`);
    } else if (command === COMMAND.TEST) {
      console.log(`\n\n📗 Test passed!`);
    } else if (command === COMMAND.APPROVE) {
      console.log(`\n\n📗 Approved changes!`);
    }

  }).catch((e) => {
  process.exitCode = 255;
  console.error('\n\n📕 ', e);
});
