(function () {
        "use strict";
        var KEY = "recallorbit:v1",
          state = {
            active: 0,
            index: 0,
            decks: [
              {
                name: "Web Essentials",
                cards: [
                  ["What does DOM stand for?", "Document Object Model"],
                  [
                    "What is event bubbling?",
                    "An event travels from its target up through ancestor elements.",
                  ],
                  [
                    "What does localStorage store?",
                    "String key-value data that persists for the same origin.",
                  ],
                ],
              },
              {
                name: "JavaScript Basics",
                cards: [
                  [
                    "What is a closure?",
                    "A function bundled with references to its surrounding lexical scope.",
                  ],
                  [
                    "What does === compare?",
                    "Value and type, without coercion.",
                  ],
                  ["What does async return?", "A Promise."],
                ],
              },
            ],
          },
          $ = function (x) {
            return document.getElementById(x);
          };
        try {
          state = Object.assign(
            state,
            JSON.parse(localStorage.getItem(KEY) || "{}"),
          );
        } catch (x) {}
        function save() {
          localStorage.setItem(KEY, JSON.stringify(state));
        }
        function deck() {
          return state.decks[state.active];
        }
        function drawDecks() {
          $("decks").innerHTML = "";
          state.decks.forEach(function (d, i) {
            var b = document.createElement("button");
            b.className = "deck" + (i === state.active ? " active" : "");
            b.innerHTML =
              "<b>" +
              d.name +
              "</b><small>" +
              d.cards.length +
              " cards</small>";
            b.onclick = function () {
              state.active = i;
              state.index = 0;
              save();
              draw();
            };
            $("decks").appendChild(b);
          });
          $("deckCount").textContent = state.decks.length + " TOTAL";
        }
        function draw() {
          drawDecks();
          var d = deck();
          $("title").textContent = d.name;
          $("deckLabel").textContent = "ACTIVE DECK";
          if (!d.cards.length) {
            $("study").innerHTML =
              '<p class="empty">This deck is empty. Add its first card below.</p>';
            $("counter").textContent = "0 / 0";
            return;
          }
          if (!$("card")) location.reload();
          state.index = Math.min(state.index, d.cards.length - 1);
          var c = d.cards[state.index];
          $("front").textContent = c[0];
          $("back").textContent = c[1];
          $("counter").textContent = state.index + 1 + " / " + d.cards.length;
          $("progress").style.width =
            ((state.index + 1) / d.cards.length) * 100 + "%";
          $("card").classList.remove("flipped");
        }
        function move(n) {
          var d = deck();
          state.index = (state.index + n + d.cards.length) % d.cards.length;
          save();
          draw();
        }
        $("card").onclick = function () {
          $("card").classList.toggle("flipped");
        };
        $("card").onkeydown = function (e) {
          if (e.code === "Space") {
            e.preventDefault();
            $("card").click();
          }
        };
        $("prev").onclick = function () {
          move(-1);
        };
        $("next").onclick = function () {
          move(1);
        };
        $("shuffle").onclick = function () {
          var a = deck().cards;
          for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1)),
              x = a[i];
            a[i] = a[j];
            a[j] = x;
          }
          state.index = 0;
          save();
          draw();
        };
        document.querySelectorAll("[data-rate]").forEach(function (b) {
          b.onclick = function () {
            var delay = { again: 0, hard: 1, easy: 3 }[b.dataset.rate];
            state.ratings = state.ratings || {};
            state.ratings[deck().name + ":" + state.index] = {
              rating: b.dataset.rate,
              next: new Date(Date.now() + delay * 86400000).toISOString(),
            };
            save();
            move(1);
          };
        });
        $("addDeck").onclick = function () {
          var name = prompt("Name this deck:");
          if (name && name.trim()) {
            state.decks.push({ name: name.trim().slice(0, 40), cards: [] });
            state.active = state.decks.length - 1;
            state.index = 0;
            save();
            draw();
          }
        };
        $("saveCard").onclick = function () {
          var q = $("question").value.trim(),
            a = $("answer").value.trim();
          if (!q || !a) return alert("Add both a question and answer.");
          deck().cards.push([q, a]);
          $("question").value = "";
          $("answer").value = "";
          save();
          location.reload();
        };
        document.addEventListener("keydown", function (e) {
          if (/textarea|input/i.test(e.target.tagName)) return;
          if (e.key === "ArrowLeft") move(-1);
          if (e.key === "ArrowRight") move(1);
        });
        draw();
      })();
