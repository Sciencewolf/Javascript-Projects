function onLoad() {
  const year = document.getElementById("year-footer");
  let _date = new Date();
  let _year = _date.getUTCFullYear();
  if(_year !== 2023) year.innerHTML = _year;
}

function sendData() {
  const input_field = document.getElementById("input_field");
  const btn_send = document.getElementById("btn-send");

  let val = input_field.value;

  btn_send.addEventListener("click", () => {
    
  });
}
