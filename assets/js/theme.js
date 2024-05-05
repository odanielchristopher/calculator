const rootElement = document.documentElement;
const switchInputElement = document.querySelector('.switch-input');
const switchButtonElement = document.querySelector('.switch-button');

const lightTheme = {
  '--background': '#e8e8e8',
  '--backgroundDisplay': '#F1F2F3',
  '--textColor': '#000',
  '--button-high': '#4B5EFC',
  '--button-medium': '#D2D3DA',
  '--button-low': '#FFFFFF',
}

const darkTheme = {
  '--background': '#212121',
  '--backgroundDisplay': '#17171C',
  '--textColor': '#FFF',
  '--button-high': '#4B5EFC',
  '--button-medium': '#4E505F',
  '--button-low': '#2E2F38',
}

function handleTheme(theme) {
  for (let prop in theme) {
    handleProp(prop, theme[prop]);
  }
}

function handleProp(prop, value) {
  rootElement.style.setProperty(prop, value);
}

function handleSwitch() {
  const translate = switchInputElement.checked ? 'translateX(40px)' : 'translateX(0px)';

  switchButtonElement.style.setProperty('transform', translate);
}

document.addEventListener('DOMContentLoaded', () => handleTheme(darkTheme));
switchInputElement.addEventListener('change', () => {
  handleTheme(switchInputElement.checked ? lightTheme : darkTheme);
  handleSwitch();
});
