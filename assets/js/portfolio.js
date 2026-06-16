/*
	Portfolio data + overlay logic for jackbruun-hammond.com
	------------------------------------------------------------------
	HOW TO EDIT YOUR PORTFOLIO:
	Everything is driven by the `projects` array below. Each project is
	one object. To change titles, subtitles, descriptions or image order,
	just edit the text here — the home grid and the pop-up overlay both
	read from this one list, so they always stay in sync.

	NOTE: every `description` below is a PLACEHOLDER written from guesses.
	Replace them with your real copy.
*/

const projects = [
	{
		folder: "TheRedBandit",
		title: "The Red Bandit",
		subtitle: "Brand identity",
		description: "PLACEHOLDER — short description of the project goes here. What it was, your role, and the idea behind it.",
		images: ["TheRedBandit.png"]
	},
	{
		folder: "NoLoveLV",
		title: "No Love",
		subtitle: "Visual identity",
		description: "PLACEHOLDER — short description of the project goes here. What it was, your role, and the idea behind it.",
		images: ["NoLoveLV_1.webp", "NoLoveLV_2.webp", "NoLoveLV_3.webp", "NoLoveLV_4.webp"]
	},
	{
		folder: "Pig",
		title: "Pig",
		subtitle: "Album / release artwork",
		description: "PLACEHOLDER — short description of the project goes here. What it was, your role, and the idea behind it.",
		images: ["Pig1.webp", "Pig2.webp"]
	},
	{
		folder: "DeathProcess",
		title: "Death Process",
		subtitle: "Album / release artwork",
		description: "PLACEHOLDER — short description of the project goes here. What it was, your role, and the idea behind it.",
		images: ["DeathProcess.webp"]
	},
	{
		folder: "Oct",
		title: "Oct",
		subtitle: "Design",
		description: "PLACEHOLDER — short description of the project goes here. What it was, your role, and the idea behind it.",
		images: ["Oct1.webp", "Oct2.webp", "Oct3.webp"]
	},
	{
		folder: "SlidingScaleOfMorality",
		title: "Sliding Scale of Morality",
		subtitle: "Design",
		description: "PLACEHOLDER — short description of the project goes here. What it was, your role, and the idea behind it.",
		images: ["SlidingScaleOfMorality_1.webp", "SlidingScaleOfMorality_2.webp", "SlidingScaleOfMorality_4.webp", "SlidingScaleOfMorality_5.webp"]
	},
	{
		folder: "CSIRO",
		title: "CSIRO",
		subtitle: "Campaign design",
		description: "PLACEHOLDER — short description of the project goes here. What it was, your role, and the idea behind it.",
		images: ["CSIRO_1.webp", "CSIRO_2.webp", "CSIRO_3.webp"]
	},
	{
		folder: "EdgeMag",
		title: "Edge Magazine",
		subtitle: "Editorial design",
		description: "PLACEHOLDER — short description of the project goes here. What it was, your role, and the idea behind it.",
		images: ["Edge_1.webp", "Edge_2.webp"]
	},
	{
		folder: "InDesignMag",
		title: "InDesign Magazine",
		subtitle: "Editorial design",
		description: "PLACEHOLDER — short description of the project goes here. What it was, your role, and the idea behind it.",
		images: ["InDesignMag_1.webp", "InDesignMag_2.webp"]
	},
	{
		folder: "SomaDesign",
		title: "Soma Design",
		subtitle: "Design",
		description: "PLACEHOLDER — short description of the project goes here. What it was, your role, and the idea behind it.",
		images: ["SOPLALB_Port1.webp", "SomaImport_Design1.webp"]
	},
	{
		folder: "AlDente",
		title: "AlDente",
		subtitle: "Product mockup",
		description: "PLACEHOLDER — short description of the project goes here. What it was, your role, and the idea behind it.",
		images: ["Mockup1.webp"]
	}
];

(function () {
	"use strict";

	const basePath = "Pages/";
	const imgSrc = (p, file) => basePath + p.folder + "/" + file;

	let currentIndex = -1;

	// --- Build the home grid ----------------------------------------
	const grid = document.getElementById("portfolio-grid");
	if (grid) {
		projects.forEach((p, i) => {
			const tile = document.createElement("article");
			tile.className = "pf-tile";
			tile.setAttribute("tabindex", "0");
			tile.setAttribute("role", "button");
			tile.setAttribute("aria-label", "Open " + p.title);
			tile.dataset.index = i;
			tile.innerHTML =
				'<span class="pf-thumb"><img src="' + imgSrc(p, p.images[0]) + '" alt="' + p.title + '" loading="lazy" /></span>' +
				'<span class="pf-caption"><h3>' + p.title + "</h3><p>" + p.subtitle + "</p></span>";
			grid.appendChild(tile);
		});
	}

	// --- Overlay references -----------------------------------------
	const overlay = document.getElementById("pf-overlay");
	const elTitle = document.getElementById("pf-title");
	const elSubtitle = document.getElementById("pf-subtitle");
	const elDesc = document.getElementById("pf-desc");
	const elImages = document.getElementById("pf-images");
	const elCounter = document.getElementById("pf-counter");

	function render(i) {
		const p = projects[i];
		if (!p) return;
		elTitle.textContent = p.title;
		elSubtitle.textContent = p.subtitle;
		elDesc.textContent = p.description;
		elCounter.textContent = (i + 1) + " / " + projects.length;
		elImages.innerHTML = "";
		p.images.forEach((file) => {
			const img = document.createElement("img");
			img.src = imgSrc(p, file);
			img.alt = p.title;
			img.loading = "lazy";
			elImages.appendChild(img);
		});
		elImages.scrollTop = 0;
	}

	function open(i) {
		currentIndex = i;
		render(i);
		overlay.classList.add("is-open");
		overlay.setAttribute("aria-hidden", "false");
		document.body.classList.add("pf-no-scroll");
	}

	function close() {
		overlay.classList.remove("is-open");
		overlay.setAttribute("aria-hidden", "true");
		document.body.classList.remove("pf-no-scroll");
		currentIndex = -1;
	}

	function go(delta) {
		if (currentIndex < 0) return;
		currentIndex = (currentIndex + delta + projects.length) % projects.length;
		render(currentIndex);
	}

	// --- Wire up events ---------------------------------------------
	if (grid) {
		grid.addEventListener("click", (e) => {
			const tile = e.target.closest(".pf-tile");
			if (tile) open(parseInt(tile.dataset.index, 10));
		});
		grid.addEventListener("keydown", (e) => {
			const tile = e.target.closest(".pf-tile");
			if (tile && (e.key === "Enter" || e.key === " ")) {
				e.preventDefault();
				open(parseInt(tile.dataset.index, 10));
			}
		});
	}

	if (overlay) {
		overlay.querySelector(".pf-close").addEventListener("click", close);
		overlay.querySelector(".pf-prev").addEventListener("click", () => go(-1));
		overlay.querySelector(".pf-next").addEventListener("click", () => go(1));
		// Click on the dark backdrop (but not the panel) closes.
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) close();
		});
	}

	document.addEventListener("keydown", (e) => {
		if (currentIndex < 0) return;
		if (e.key === "Escape") close();
		else if (e.key === "ArrowLeft") go(-1);
		else if (e.key === "ArrowRight") go(1);
	});
})();
