const countDo = () => {
    const dos = document.getElementById("todo-list");
    const dosNumber = dos.childElementCount;
    const numberSlot = document.getElementsByClassName("todo-count")[0];
    numberSlot.innerHTML = fitDoFormat(dosNumber);
}

const fitDoFormat = (number) => {
    return "총 <strong>"+ number +"</strong> 개";
}