const pages = [
  "नमस्कार दर्शकवृन्द।",
  "आजको कार्यक्रममा यहाँहरूलाई स्वागत छ।",
  "आज हामी नेपालको बारेमा कुरा गर्नेछौँ।"
];

let currentPage = 0;

const app = document.querySelector<HTMLDivElement>("#app")!;

app.style.cssText = "padding:20px;text-align:center;font-family:sans-serif;";

function showPage() {
  app.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Nepali G2 Teleprompter";

  const text = document.createElement("p");
  text.style.cssText = "font-size:24px;line-height:1.8;";
  text.textContent = pages[currentPage];

  const counter = document.createElement("p");
  counter.textContent = (currentPage + 1) + " / " + pages.length;

  const previous = document.createElement("button");
  previous.textContent = "Previous";
  previous.onclick = () => {
    currentPage = Math.max(0, currentPage - 1);
    showPage();
  };

  const next = document.createElement("button");
  next.textContent = "Next";
  next.onclick = () => {
    currentPage = Math.min(pages.length - 1, currentPage + 1);
    showPage();
  };

  app.append(title, text, counter, previous, next);
}

showPage();
