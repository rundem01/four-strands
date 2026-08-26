// Four Strands — data backup & restore
// Exports everything this PWA has saved in localStorage as a downloadable
// JSON file, and restores it back in on any device.
//
// Setup:
//   1. Save this file next to daily.js and verses.js.
//   2. Add <script src="backup.js"></script> in index.html, alongside your
//      other <script> tags.
//   3. Add the export/import buttons shown at the bottom of this file
//      wherever makes sense in your UI (Guides screen is a natural fit).

function fourStrandsExport() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    data[key] = localStorage.getItem(key);
  }

  const payload = {
    app: "four-strands",
    version: 1,
    exportedAt: new Date().toISOString(),
    data
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `four-strands-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function fourStrandsImport(file) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    let payload;
    try {
      payload = JSON.parse(event.target.result);
    } catch {
      alert("That file isn't valid JSON — is it a Four Strands backup?");
      return;
    }

    if (!payload || payload.app !== "four-strands" || typeof payload.data !== "object") {
      alert("That doesn't look like a Four Strands backup file.");
      return;
    }

    const entryCount = Object.keys(payload.data).length;
    const exportDate = payload.exportedAt
      ? new Date(payload.exportedAt).toLocaleDateString()
      : "an unknown date";

    const confirmed = confirm(
      `This backup has ${entryCount} saved item(s) from ${exportDate}. ` +
      `Restoring it will overwrite your current data on this device. Continue?`
    );
    if (!confirmed) return;

    Object.entries(payload.data).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    alert("Backup restored. Reloading Four Strands...");
    location.reload();
  };

  reader.onerror = () => alert("Could not read that file.");
  reader.readAsText(file);
}

/* Drop this markup wherever you want the buttons to live:

<button type="button" onclick="fourStrandsExport()">Export backup</button>

<input
  type="file"
  id="four-strands-import-input"
  accept="application/json"
  style="display:none"
  onchange="fourStrandsImport(this.files[0]); this.value = '';"
>
<button type="button" onclick="document.getElementById('four-strands-import-input').click()">
  Import backup
</button>

Style both buttons with your existing strand-colored classes to match the rest of the UI.
*/
