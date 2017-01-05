function setBloodA(percent) {
  percent = parseInt(percent);
  if (percent > 100)
    percent = 100;
  document.getElementById('blood_A').setAttribute('data-progress', percent)
  return ;
}
function setBloodB(percent) {
  percent = parseInt(percent);
  if (percent > 100)
    percent = 100;
  document.getElementById('blood_B').setAttribute('data-progress', percent)
  return ;
}
function setBloodAB(percent) {
  percent = parseInt(percent);
  if (percent > 100)
    percent = 100;
  document.getElementById('blood_AB').setAttribute('data-progress', percent)
  return ;
}
function setBloodO(percent) {
  percent = parseInt(percent);
  if (percent > 100)
    percent = 100;
  document.getElementById('blood_O').setAttribute('data-progress', percent)
  return ;
}
function setLevel(level) {
  document.getElementById('level').getElementsByTagName('span')[0].innerHTML = level
  return ;
}
