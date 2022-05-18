
AOS.init({
});

(function initCounters() {
  var counters = document.getElementById("counters");
  numbers = counters.querySelectorAll(".counter_num span");
  var counterObjects = [];
  [].forEach.call(numbers, (num, i) => {
    counterObjects[i] = { "target": parseInt(num.innerText.trim().split(" ").join("")), "value": 0 };
    num.innerText = 0
  });

  document.addEventListener("aos:in:start-counters", ({ detail }) => {
    setTimeout(function countNumbersUp() {
      [].forEach.call(numbers, (num, i) => {
        var targetObj = counterObjects[i];
        targetObj["value"] = targetObj["target"] * 0.0001 + targetObj["value"]
        result = Math.round(targetObj["value"]);
        if (result < targetObj["target"]) {
          setTimeout(countNumbersUp, 100);
        }
        else {
          result = targetObj["target"];
        }
        num.innerText = result.toLocaleString("en-US").replace(",", " ");
      });
    }, 100);
  })
})();

(function initAccordeon() {
  var accordeon = document.querySelector(".accordeon");
  var items = accordeon.querySelectorAll(".accordeon-item")
  activeItem = -1;
  [].forEach.call(items, (item, i) => {
    item.addEventListener("click", function(e) {
      toggleItem(item, i);
    });
  });
  function toggleItem(item, i) {
    if (i == activeItem) {
      closeItem(item);
      activeItem = -1;
    }
    else {
      openItem(item);
      if (activeItem != -1) {
        closeItem(items[activeItem]);
      }
      activeItem = i;
    }
  }
  function openItem(item) {
    item.classList.add("active");
  }
  function closeItem(item) {
    item.classList.remove("active");
  }
})();
