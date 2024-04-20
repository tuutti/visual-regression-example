/* eslint-disable no-console */
const processArgs = process.argv.slice(2);
const envPath = '.env';
require('dotenv').config({ path: envPath }); // Get environment from instance .env file
const backstop = require('backstopjs');

const COMMAND = {
  REFERENCE: 'reference',
  TEST: 'test',
  APPROVE: 'approve',
};

function getConfig(hostname) {
  const removeDefault = [
    'iframe',
  ];

  // All of our breakpoints
  let viewports = [
    {
      'label': 'Breakpoint_XS',
      'width': 320,
      'height': 450
    },
    {
      'label': 'Breakpoint_S',
      'width': 576,
      'height': 630
    },
    {
      'label': 'Breakpoint_M',
      'width': 768,
      'height': 920
    },
    {
      'label': 'Breakpoint_L',
      'width': 992,
      'height': 650
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

  let scenarios = [
    {
      'label': 'Landing page',
      'url': `http://${hostname}/user`,
      'removeSelectors': removeDefault
    }
  ];

  return {
    filter: processArgs[2] ?? null, // Add filter for label string here if you want to debug a single component, like the events component.
    docker: true,
    config: {
      'dockerCommandTemplate': 'docker run --rm --network=stonehenge-network --mount type=bind,source="{cwd}",target=/src backstopjs/backstopjs:{version} {backstopCommand} {args}',
      'viewports': viewports,
      'scenarios': scenarios,
      'mergeImgHack': true,
      'onBeforeScript': 'onBefore.js',
      'paths': {
        'bitmaps_reference': `web/backstop/bitmaps_reference`,
        'bitmaps_test': `web/backstop/bitmaps_test`,
        'engine_scripts': `web/backstop/engine_scripts`,
        'html_report': `web/backstop/html_report`,
        'ci_report': `web/backstop/ci_report`
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
}

if (process.env.DRUPAL_HOSTNAME) {
  const drupalHostname = process.env.DRUPAL_HOSTNAME;
  const hostname = process.env.COMPOSE_PROJECT_NAME + ':8080';
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

  const reportUrl = `https://${drupalHostname}/backstop/html_report/index.html`;

  backstop(command, getConfig(hostname))
    .then(() => {
      if(command === COMMAND.REFERENCE) {
        console.log(`\n\n📗 Created reference\n\nNext, do some changes and run 'test' command or check the report:\n🖼️  ${reportUrl}`);
      } else if (command === COMMAND.TEST) {
        console.log(`\n\n📗 Test passed\n\nYou can now check the report:\n🖼️  ${reportUrl}`);
      } else if (command === COMMAND.APPROVE) {
        console.log(`\n\n📗 Approved changes, you can verify by checking the report:\n\nYou can now check the report:\n🖼️  ${reportUrl}`);
      }

    }).catch((e) => {
    process.exitCode = 255;
    console.error('\n\n📕 ', e, `\n\nCheck the report:\n🖼️  ${reportUrl}`);
  });

} else {
  process.exitCode = 1;
  console.error(`📕 Environment not found, are you sure the instance .env file can be found in ${envPath}?`);
}
