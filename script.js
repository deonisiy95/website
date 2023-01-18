const steps = [
  'show_front',
  'show_bottom',
  'show_right',
  'show_back',
  'show_top',
  'show_left',
];

let active = 0;

function getNextStepIndex(current) {
  return current === steps.length - 1 ? 0 : current + 1;
}

function getPrevStepIndex(current) {
  return current === 0 ? steps.length - 1 : current - 1;
}

function setActiveBox(prevStep, step) {
  const side = `box_${step.split('_')[1]}`;
  const prevSide = `box_${prevStep.split('_')[1]}`;
  const sideElement = document.getElementsByClassName(side)[0];
  const prevElement = document.getElementsByClassName(prevSide)[0];

  prevElement.classList.remove('active');
  sideElement.classList.add('active');
}

function nextScreen() {
  const boxElement = document.getElementById('box');

  const currentStep = steps[active];
  const nextStepIndex = getNextStepIndex(active);
  const nextStep = steps[nextStepIndex];
  active = nextStepIndex;

  boxElement.classList.replace(currentStep, nextStep);
  setActiveBox(currentStep, nextStep);
}

function previousScreen() {
  const boxElement = document.getElementById('box');

  const currentStep = steps[active];
  const prevStepIndex = getPrevStepIndex(active);
  const prevStep = steps[prevStepIndex];
  active = prevStepIndex;

  boxElement.classList.replace(currentStep, prevStep);
  setActiveBox(currentStep, prevStep);
}

function onKeyDown(event) {
  if (['Space', 'ArrowRight'].includes(event.code)) {
    nextScreen();
    return;
  }

  if (event.code === 'ArrowLeft') {
    previousScreen();
  }
}

let xDown = null;
let yDown = null;

function handleTouchStart(event) {
  const firstTouch = event.touches && event.touches[0];

  if (!firstTouch) {
    return;
  }

  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  const xUp = evt.touches[0].clientX;
  const yUp = evt.touches[0].clientY;

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if ( xDiff > 0 ) {
      nextScreen();
    } else {
      previousScreen();
    }
  }

  xDown = null;
  yDown = null;
}

window.onload = function() {
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('click', nextScreen);
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  document.getElementById('links').addEventListener(
    'click', event => event.stopPropagation()
  );
}
