import "./style.css";

const env = {
  token: "7021302654:AAFlJEoXCXEtUtcRM5xjmJzGNFTUp7FEXzI",
};

const form = document.querySelector("#form") as HTMLFormElement;

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data: Record<string, any> = {};
    const formData = new FormData(form);
    formData.forEach((value, key) => {
      console.log(value, key);
      data[key] = value;
    });
    sendToTelegram(data)
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  });
}
const isElementInViewport = (el: Element) => {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const checkForVisibility = () => {
  var elements = document.querySelectorAll(".appearance");
  elements.forEach((element) => {
    if (isElementInViewport(element)) {
      element.classList.add("show");
    } else {
      // element.classList.remove("show");
    }
  });
};

window.addEventListener("DOMContentLoaded", checkForVisibility, false);
window.addEventListener("load", checkForVisibility, false);

window.addEventListener("scroll", () => {
  checkForVisibility();

  const distance = window.scrollY * 0.4;

  const ringGrape = document.querySelector("#ring-grape") as HTMLImageElement;
  if (ringGrape && distance < 330) {
    ringGrape.style.transform = `translateY(${distance}px)`;
  }
});

const sendToTelegram = async (data: Record<string, string>) => {
  let content = ``;

  Object.entries(data).forEach(([key, value]) => {
    content = `${content}%0A<b>${key}:</b> ${
      value === "on" || value === "yes"
        ? '<tg-emoji emoji-id="5368324170671202286">👍</tg-emoji>'
        : value === "no"
        ? '<tg-emoji emoji-id="5368324170671202286">👎🏿</tg-emoji>'
        : value
    }`;
  });

  try {
    const request = await fetch(
      `https://api.telegram.org/bot${env.token}/sendMessage?chat_id=@wedding_report&parse_mode=HTML&text=${content}`
    );
    const json = await request.json();
    console.log(json);
  } catch (e) {
    console.log(e);
  }
};
