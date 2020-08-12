document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


function like(e) {
  const button = e.currentTarget
  // const user = session.currentUser
  axios
    .post(`http://localhost:3000/${button.id}/like`)
    .then((res) => {
      const add = res.data.like
      button.querySelector('.likes-count').innerText =
        Number(button.querySelector('.likes-count').innerText) + add
    })
    .catch(console.error)
}

// Show/hide password onClick of button using Javascript only

// https://stackoverflow.com/questions/31224651/show-hide-password-onclick-of-button-using-javascript-only

function show() {
  var p = document.getElementById('password');
  p.setAttribute('type', 'text');
}

function hide() {
  var p = document.getElementById('password');
  p.setAttribute('type', 'password');
}

var pwShown = 0;

document.getElementById("eye").addEventListener("click", function () {
  if (pwShown == 0) {
      pwShown = 1;
      show();
  } else {
      pwShown = 0;
      hide();
  }
}, false);