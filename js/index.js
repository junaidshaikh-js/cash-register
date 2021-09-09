const billAmountInput = document.querySelector("#bill-amount");
const cashGivenInput = document.querySelector("#cash-given");
const form = document.querySelector("form");
const noteCells = document.querySelectorAll(".notes");

const notes = [2000, 500, 100, 50, 20, 10, 1];

function flush(amountToBeReturned) {
  for (let i = 0; i < notes.length; i++) {
    let value = notes[i];

    if (!amountToBeReturned) {
      break;
    }

    console.log(i);
    let numberOfNotes = Math.floor(amountToBeReturned / value);

    noteCells[i].innerHTML = numberOfNotes;

    amountToBeReturned %= value;
  }
  // notes.forEach((value, index) => {
  // });
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

  e.preventDefault();
}

form.addEventListener("submit", calculateChange);
