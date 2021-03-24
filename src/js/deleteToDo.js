
const deleteToDos = () => {
    let xMarks = document.getElementsByClassName("destroy");

    Array.prototype.forEach.call(xMarks, function(xMark) {
        xMark.addEventListener('click', clickXMark);
    })
}

const clickXMark = (event) => {
    event.currentTarget.parentNode.parentNode.remove();

    countDo();
}