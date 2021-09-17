const billAmountInput = document.querySelector("#bill-amount");
const cashGivenInput = document.querySelector("#cash-given");
const form = document.querySelector("form");
const noteCells = document.querySelectorAll(".notes");

const nextBtn = document.querySelector(".next");
const stepTwo = document.querySelector(".form-step-two");
const changeTable = document.querySelector(".change-returned");

stepTwo.style.display = "none";
changeTable.style.display = "none";

nextBtn.addEventListener("click", () => {
  if (!billAmountInput.value) {
    alertUser("Enter Bill Amount");
  } else if (billAmountInput.value < 1) {
    alertUser("Enter Value greater than 0");
  } else {
    stepTwo.style.display = "block";
    nextBtn.style.display = "none";
  }
});

const notes = [2000, 500, 100, 20, 10, 5, 1];

function flush(amountToBeReturned) {
  noteCells.forEach((noteCell) => {
    noteCell.innerHTML = "0";
  });

  for (let i = 0; i < notes.length; i++) {
    let value = notes[i];

    if (!amountToBeReturned) {
      break;
    }

    let numberOfNotes = Math.floor(amountToBeReturned / value);

    noteCells[i].innerHTML = numberOfNotes;

    amountToBeReturned %= value;
  }
}

function alertUser(message) {
  let para = document.createElement("p");
  para.innerText = message;
  para.setAttribute("class", "error-msg");

  form.after(para);

  billAmountInput.value = "";
  cashGivenInput.value = "";

  setTimeout(() => {
    para.remove();
  }, 3000);
}

function calculateChange(e) {
  const billAmount = +billAmountInput.value;
  const cashGiven = +cashGivenInput.value;

  if (cashGiven < billAmount) {
    alertUser("Do you want to wash plates?");
  } else if (cashGiven == billAmount) {
    alertUser("You are good to go. Thank you!");
  } else {
    let amountToBeReturned = cashGiven - billAmount;
    flush(amountToBeReturned);
  }

  changeTable.style.display = "block";
  e.preventDefault();
}

form.addEventListener("submit", calculateChange);
