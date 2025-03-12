const splitByChars = Array.from(document.querySelectorAll(".js-split-chars"));
splitByChars.forEach((item) => {
  const text = item.textContent;
  item.style.setProperty("--word-total", text.trim().split(" ").length);
  item.style.setProperty("--char-total", text.trim().split("").length);
  item.style.visibility = "visible";
  const words = text
    .trim()
    .split(" ")
    .map((elm, i) =>
      ` <span class="word" data-word="Grow" style="--word-index: ${i};">${elm
        .split("")
        .map(
          (elm2, i2) =>
            `<span class="char" data-char="G" style="--char-index: ${
              i + i2
            };">${elm2}</span>`
        )
        .join("")}</span><span class="whitespace"> </span>`.trim()
    );

  console.log("Words count", words.length);
  console.log("Words", words);
  item.innerHTML = words.join("");
});
