const stockContainer = document.getElementById("stock-container");
const fetchBtn = document.getElementById("findstock");
const inputStock = document.getElementById("stockname");

fetchBtn.addEventListener("click", () => {
    const name = inputStock.value.toUpperCase();

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${name}&apikey=YOUR_KEY`)
        .then(res => res.json())
        .then(data => {
            const stock = data["Global Quote"];

            if (!stock || !stock["01. symbol"]) {
                stockContainer.innerHTML = "Stock not found";
                return;
            }

            stockContainer.innerHTML = `
                <h3>${stock["01. symbol"]}</h3>
                <p>Price: ${stock["05. price"]}</p>
            `;
        })
        .catch(() => {
            stockContainer.innerHTML = "Error fetching data";
        });
});