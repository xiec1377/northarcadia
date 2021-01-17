// citation: https://dev.to/albertomontalesi/add-dark-mode-to-your-website-with-just-a-few-lines-of-code-5baf 
window.onload=function(){
  const checkbox = document.getElementById('checkbox');

  checkbox.addEventListener('change', ()=> {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
  if (localStorage.getItem('theme') === 'dark') {
     
    document.body.classList.add('dark');
  } 
}

function returnGallery() {
    window.location.replace("gallery.html");
}

//jquery checkbox
var checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {};
var $checkboxes = $("#checkbox:checkbox");

$checkboxes.on("change", function(){
  $checkboxes.each(function(){
    checkboxValues[this.id] = this.checked;
  });
  localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
});

$.each(checkboxValues, function(key, value) {
  $("#" + key).prop('checked', value);
});