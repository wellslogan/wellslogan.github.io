(function () {
  "use strict";

  var THEME_KEY = "loganSite.theme";
  var ANIMATION_KEY = "loganSite.animationState";
  var STEP_DELAY = 24;

  var profileMarkdown = `
What does it mean to be a software developer in the era of large language models? When you figure it out, let me know. Until then, I'm gonna keep on building.

I'm Logan, full-stack web developer based in Cambridge, Massachusetts. You might see me walking, listening, dining, ruminating, doomscrolling, or hiking the Greater Boston Area from time to time.

When I'm on the clock, you'll find me building custom software solutions for the architecture, engineering, and construction industry with [Pelogic](https://pelogic.io). 
`;

  var messages = parseMarkdownParagraphs(profileMarkdown);

  var copyText = [
    "Logan Wells - full-stack web developer",
    "GitHub: https://github.com/wellslogan",
    "LinkedIn: https://linkedin.com/in/wellslogan1",
    "Website: https://wellslogan.com"
  ].join("\n");

  document.addEventListener("DOMContentLoaded", function () {
    var transcript = document.querySelector("[data-transcript]");
    var skipButton = document.querySelector("[data-skip]");
    var restartButton = document.querySelector("[data-restart]");
    var copyButton = document.querySelector("[data-copy]");
    var copyFeedback = document.querySelector("[data-copy-feedback]");
    var themeButton = document.querySelector("[data-theme-toggle]");
    var fileTray = document.querySelector("[data-file-tray]");
    var thinkingIndicator = document.querySelector("[data-thinking]");
    var viewingTimer = document.querySelector("[data-viewing-timer]");
    var viewingToggle = document.querySelector("[data-viewing-toggle]");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var timer = null;
    var loadStartedAt = Date.now();

    if (!transcript || !skipButton || !restartButton || !copyButton || !copyFeedback || !themeButton || !fileTray || !thinkingIndicator || !viewingTimer) {
      return;
    }

    initTheme(themeButton);
    initViewingTimer(viewingTimer, loadStartedAt);

    if (viewingToggle) {
      viewingToggle.addEventListener("click", function () {
        var expanded = viewingToggle.getAttribute("aria-expanded") === "true";
        viewingToggle.setAttribute("aria-expanded", String(!expanded));
      });
    }

    var paragraphNodes = Array.prototype.slice.call(transcript.querySelectorAll("p"));

    if (paragraphNodes.length !== messages.length) {
      transcript.textContent = "";
      paragraphNodes = messages.map(function () {
        var node = document.createElement("p");
        transcript.appendChild(node);
        return node;
      });
    }

    function validState(state) {
      if (!state || typeof state !== "object") {
        return false;
      }
      if (typeof state.messageIndex !== "number" || typeof state.charIndex !== "number") {
        return false;
      }
      if (state.messageIndex < 0 || state.messageIndex >= messages.length) {
        return Boolean(state.completed) && state.messageIndex === messages.length;
      }
      if (state.charIndex < 0 || state.charIndex > messages[state.messageIndex].text.length) {
        return false;
      }
      return true;
    }

    function baseState() {
      return {
        messageIndex: 0,
        charIndex: 0,
        completed: false,
        updatedAt: new Date().toISOString()
      };
    }

    function completedState() {
      return {
        messageIndex: messages.length,
        charIndex: 0,
        completed: true,
        updatedAt: new Date().toISOString()
      };
    }

    function readState() {
      try {
        var parsed = JSON.parse(localStorage.getItem(ANIMATION_KEY));
        return validState(parsed) ? parsed : baseState();
      } catch (error) {
        return baseState();
      }
    }

    function saveState(state) {
      try {
        var next = Object.assign({}, state, { updatedAt: new Date().toISOString() });
        localStorage.setItem(ANIMATION_KEY, JSON.stringify(next));
      } catch (error) {
        // Private browsing modes can block storage; the page still works without persistence.
      }
    }

    function renderState(state) {
      paragraphNodes.forEach(function (node, index) {
        var message = messages[index];
        if (state.completed || index < state.messageIndex) {
          renderMessage(node, message, message.text.length);
        } else if (index === state.messageIndex) {
          renderMessage(node, message, state.charIndex);
        } else {
          node.textContent = "";
        }
      });

      thinkingIndicator.hidden = state.completed;
      fileTray.hidden = !state.completed;
      fileTray.setAttribute("aria-hidden", String(!state.completed));
    }

    function finish() {
      var state = completedState();
      renderState(state);
      saveState(state);
    }

    function clearTimer() {
      if (timer) {
        window.clearTimeout(timer);
        timer = null;
      }
    }

    function playFrom(state) {
      clearTimer();
      renderState(state);
      saveState(state);

      if (state.completed) {
        return;
      }

      timer = window.setTimeout(function () {
        var next = Object.assign({}, state);
        var currentMessage = messages[next.messageIndex].text;

        if (next.charIndex < currentMessage.length) {
          next.charIndex += 1;
        } else if (next.messageIndex < messages.length - 1) {
          next.messageIndex += 1;
          next.charIndex = 0;
        } else {
          next = completedState();
        }

        playFrom(next);
      }, STEP_DELAY);
    }

    if (reducedMotion || messages.length === 0) {
      finish();
    } else {
      playFrom(readState());
    }

    skipButton.addEventListener("click", function () {
      clearTimer();
      finish();
    });

    restartButton.addEventListener("click", function () {
      clearTimer();
      try {
        localStorage.removeItem(ANIMATION_KEY);
      } catch (error) {
        // Storage may be unavailable; replay from memory anyway.
      }
      if (reducedMotion || messages.length === 0) {
        finish();
      } else {
        playFrom(baseState());
      }
    });

    copyButton.addEventListener("click", function () {
      copyProfile(copyText)
        .then(function () {
          showCopyFeedback(copyFeedback, "Copied!");
        })
        .catch(function () {
          showCopyFeedback(copyFeedback, "Couldn't copy");
        });
    });
  });

  function parseMarkdownParagraphs(markdown) {
    return markdown
      .trim()
      .split(/\n\s*\n/)
      .map(function (block) {
        return block
          .split("\n")
          .map(function (line) {
            return line.trim();
          })
          .join(" ")
          .trim();
      })
      .filter(Boolean)
      .map(function (text) {
        var tokens = parseInlineMarkdown(text);

        return {
          type: "paragraph",
          text: tokens.map(function (token) {
            return token.text;
          }).join(""),
          tokens: tokens
        };
      });
  }

  function parseInlineMarkdown(text) {
    var tokens = [];
    var cursor = 0;
    var linkPattern = /\[([^\]]+)\]\(([^)\s]+)(?:\s+(?:"[^"]*"|'[^']*'))?\)/g;
    var match;

    while ((match = linkPattern.exec(text)) !== null) {
      if (match.index > cursor) {
        tokens.push({
          type: "text",
          text: text.slice(cursor, match.index)
        });
      }

      if (isSafeMarkdownLink(match[2])) {
        tokens.push({
          type: "link",
          text: match[1],
          href: match[2]
        });
      } else {
        tokens.push({
          type: "text",
          text: match[0]
        });
      }

      cursor = linkPattern.lastIndex;
    }

    if (cursor < text.length) {
      tokens.push({
        type: "text",
        text: text.slice(cursor)
      });
    }

    return tokens;
  }

  function isSafeMarkdownLink(href) {
    var scheme = href.match(/^([a-z][a-z0-9+.-]*):/i);
    return !scheme || /^(https?|mailto|tel)$/i.test(scheme[1]);
  }

  function renderMessage(node, message, characterCount) {
    var remaining = characterCount;
    node.textContent = "";

    message.tokens.forEach(function (token) {
      var visibleText;

      if (remaining <= 0) {
        return;
      }

      visibleText = token.text.slice(0, remaining);
      remaining -= visibleText.length;

      if (token.type === "link") {
        var link = document.createElement("a");
        link.textContent = visibleText;
        link.href = token.href;

        if (/^https?:\/\//i.test(token.href)) {
          link.target = "_blank";
          link.rel = "noreferrer noopener";
        }

        node.appendChild(link);
      } else {
        node.appendChild(document.createTextNode(visibleText));
      }
    });
  }

  function initTheme(themeButton) {
    var saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (error) {
      saved = null;
    }

    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = saved === "light" || saved === "dark" ? saved : (prefersDark ? "dark" : "light");
    applyTheme(theme, themeButton);

    themeButton.addEventListener("click", function () {
      var nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, themeButton);
      try {
        localStorage.setItem(THEME_KEY, nextTheme);
      } catch (error) {
        // Theme changes still apply for the current visit if storage is blocked.
      }
    });
  }

  function applyTheme(theme, themeButton) {
    document.documentElement.dataset.theme = theme;
    themeButton.setAttribute("aria-pressed", String(theme === "dark"));
    themeButton.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
    themeButton.querySelector("[data-theme-label]").textContent = theme === "dark" ? "dark session" : "light session";
  }

  function initViewingTimer(node, startedAt) {
    function update() {
      var elapsedSeconds = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
      node.textContent = "Viewing for " + formatElapsed(elapsedSeconds);
    }

    update();
    window.setInterval(update, 1000);
  }

  function formatElapsed(totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;
    var parts = [];

    if (hours > 0) {
      parts.push(hours + "h");
    }
    if (minutes > 0 || hours > 0) {
      parts.push(minutes + "m");
    }
    parts.push(seconds + "s");

    return parts.join(" ");
  }

  function copyProfile(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        var copied = document.execCommand("copy");
        document.body.removeChild(textarea);
        copied ? resolve() : reject(new Error("Copy command rejected"));
      } catch (error) {
        document.body.removeChild(textarea);
        reject(error);
      }
    });
  }

  function showCopyFeedback(node, message) {
    node.classList.remove("is-visible");
    node.textContent = message;
    window.clearTimeout(node._copyTimer);

    // Restart the poof when the button is clicked again before it finishes.
    void node.offsetWidth;
    node.classList.add("is-visible");

    node._copyTimer = window.setTimeout(function () {
      node.classList.remove("is-visible");
      node.textContent = "";
    }, 1100);
  }
})();
