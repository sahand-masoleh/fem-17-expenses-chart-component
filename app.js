var spendingChart = document.querySelector(".spending__chart");

async function fetchData(url, chart) {
	try {
		let data = await fetch(url);
		data = await data.json();
		let heighest = Math.max(...data.map((e) => e.amount));
		heighest = data.findIndex((e) => e.amount === heighest);
		data[heighest].heighest = true;
		drawBars(data, chart);
	} catch (error) {
		console.log(error);
	}
}

function drawBars(data, chart) {
	const heighest = data.find((e) => e.heighest).amount;
	for (const entry of data) {
		const barContainer = document.createElement("div");
		barContainer.classList.add("spending__bar-container");
		chart.appendChild(barContainer);

		const bar = document.createElement("div");
		bar.classList.add("spending__bar");
		if (entry.heighest) {
			bar.classList.add("spending__bar--heighest");
		}
		bar.style.height = `${(entry.amount * 100) / heighest}%`;
		barContainer.appendChild(bar);

		const amount = document.createElement("div");
		amount.classList.add("spending__amount");
		amount.innerText = `${entry.amount}`;
		bar.appendChild(amount);

		const day = document.createElement("div");
		day.classList.add("spending__day");
		day.innerText = `${entry.day}`;
		bar.appendChild(day);
	}
}

fetchData("./data.json", spendingChart);
