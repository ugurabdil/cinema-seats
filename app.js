const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserve");
getFromLocalStorage();
calculateTotal();

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserve")
  ) {
    e.target.classList.toggle("selected");
    calculateTotal();
  }
});
select.addEventListener("change", (e) => {
  calculateTotal();
  //   e.target.classList.remove("selected", "reserve");
});

function calculateTotal() {
  const selectedSeats = container.querySelectorAll(".seat.selected");
  const selectedSeatsArr = [...selectedSeats];
  const seatsArr = [...seats];

  //   selectedSeats.forEach((seat) => {
  //     selectedSeatsArr.push(seat);
  //   });
  //   seats.forEach((seat) => {
  //     seatsArr.push(push);
  //   });

  let selectedSeatIndexs = selectedSeatsArr.map((seat) => {
    return seatsArr.indexOf(seat);
  });
  console.log(selectedSeatIndexs);
  let selectedSeatCount = container.querySelectorAll(".seat.selected").length;

  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;

  saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}

function saveToLocalStorage(index) {
  localStorage.setItem("selectedSeats", JSON.stringify(index));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}
