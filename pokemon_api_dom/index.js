const pokeContainer = document.getElementById("pokemon-container");
const fetchBtn = document.getElementById("findPoke");
const inputPoke = document.getElementById("pokename");

fetchBtn.addEventListener("click", () => {
    const name = inputPoke.value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(data => {
            pokeContainer.innerHTML = `
                <div class="pokemon-card">
                    <h3>${data.name}</h3>
                    <img src="${data.sprites.front_default}" alt="${data.name}" />
                </div>
            `;
        })
        .catch(err => {
            pokeContainer.innerHTML = `<p style="color: red;">ไม่พบโปเกมอนตัวนี้ครับ</p>`;
        });
});