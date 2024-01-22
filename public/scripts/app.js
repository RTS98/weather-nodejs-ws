console.log("Client side JS file is loaded");

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  messageOne.textContent = "Loading";
  messageTwo.textContent = "";

  fetch(`/weather?address=${searchInput.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.address;
        messageTwo.textContent = `Forecast: ${
          data.forecast
        } with maximum temperature ${Math.floor(
          data.maxTemperature
        )} and humidity ${data.humidity}`;
      }
    });
  });
});
