let list_actas = document.getElementsByClassName("btn_actas");
let modal = document.getElementById("myModal");

for (let i = 0; i < list_actas.length; i++) {
    list_actas[i].addEventListener("click", (event) => {
        event.preventDefault();
        modal.style.display = 'block';
        document.getElementById("frame_viewer").src=event.target.href;
    })
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}