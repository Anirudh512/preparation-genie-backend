const state = {
  releases: [],
  currentLive: null,
};

const releasesList = document.getElementById('releases-list');
const currentLive = document.getElementById('current-live');
const draftForm = document.getElementById('draft-form');
const draftStatus = document.getElementById('draft-status');
const releaseKind = document.getElementById('release-kind');
const contentManifestWrap = document.getElementById('content-manifest-wrap');
const refreshBtn = document.getElementById('refresh-btn');
const logoutBtn = document.getElementById('logout-btn');

function setStatus(target, message, isError = false) {
  target.textContent = message || '';
  target.style.color = isError ? '#dc2626' : '#5f7a76';
}

function formatDate(value) {
  if (!value) return 'Not published yet';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return date.toLocaleString();
}

function humanBytes(bytes) {
  const size = Number(bytes || 0);
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

async function sendJson(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (response.status === 401) {
    window.location.href = '/release-center/login';
    throw new Error('Admin session expired');
  }
  if (!response.ok) {
    throw new Error(data.msg || `Request failed with ${response.status}`);
  }
  return data;
}

function renderCurrentLive() {
  if (!state.currentLive) {
    currentLive.innerHTML = '<p class="empty-state">No live release yet. Create the first 2.0.0 draft and publish it.</p>';
    return;
  }

  currentLive.innerHTML = `
    <h3>${state.currentLive.displayVersion}</h3>
    <div class="release-meta">
      <span class="chip">${state.currentLive.releaseKind}</span>
      <span class="chip">Binary ${state.currentLive.binaryVersionName}</span>
      <span class="chip">Posted ${formatDate(state.currentLive.publishedAt)}</span>
    </div>
    <p class="muted">${state.currentLive.releaseNotes || 'No release notes provided.'}</p>
    <div class="actions">
      <a href="${state.currentLive.downloadPageUrl}" target="_blank" rel="noreferrer">Open public page</a>
      ${state.currentLive.apkPublicUrl ? `<a href="${state.currentLive.apkPublicUrl}" target="_blank" rel="noreferrer">Direct APK</a>` : ''}
    </div>
  `;
}

function toggleContentManifestField() {
  const isPatch = releaseKind.value === 'contentPatch';
  contentManifestWrap.classList.toggle('hidden', !isPatch);
}

async function promptAndUpload(releaseId) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.apk,application/vnd.android.package-archive';
  input.addEventListener('change', async () => {
    const file = input.files && input.files[0];
    if (!file) return;
    try {
      const response = await fetch(`/api/admin/releases/${releaseId}/upload-apk`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/vnd.android.package-archive',
        },
        body: await file.arrayBuffer(),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.msg || `Upload failed (${response.status})`);
      }
      await loadReleases();
    } catch (error) {
      alert(error.message);
    }
  });
  input.click();
}

function renderReleaseItem(release) {
  const item = document.createElement('article');
  item.className = 'release-item';
  item.innerHTML = `
    <h3>${release.displayVersion}</h3>
    <div class="release-meta">
      <span class="chip">${release.status}</span>
      <span class="chip">${release.releaseKind}</span>
      <span class="chip">Line ${release.releaseLine}</span>
      <span class="chip">Binary ${release.binaryVersionName}</span>
      <span class="chip">${humanBytes(release.sizeBytes)}</span>
    </div>
    <p class="muted">${release.releaseNotes || 'No release notes provided.'}</p>
    ${release.buildCommand ? `<div class="code-block">${release.buildCommand}</div>` : ''}
    <p class="muted">Published: ${formatDate(release.publishedAt)}</p>
    <div class="actions"></div>
  `;

  const actions = item.querySelector('.actions');
  if (release.releaseKind === 'apkRelease' && release.status === 'draft') {
    const uploadBtn = document.createElement('button');
    uploadBtn.type = 'button';
    uploadBtn.className = 'ghost';
    uploadBtn.textContent = release.apkObjectKey ? 'Replace APK' : 'Upload APK';
    uploadBtn.addEventListener('click', () => promptAndUpload(release.id));
    actions.appendChild(uploadBtn);
  }

  if (release.status === 'draft') {
    const publishBtn = document.createElement('button');
    publishBtn.type = 'button';
    publishBtn.textContent = 'Publish';
    publishBtn.addEventListener('click', async () => {
      try {
        await sendJson(`/api/admin/releases/${release.id}/publish`, { method: 'POST' });
        await loadReleases();
      } catch (error) {
        alert(error.message);
      }
    });
    actions.appendChild(publishBtn);
  }

  if (release.status !== 'draft' && (!state.currentLive || release.id !== state.currentLive.id)) {
    const rollbackBtn = document.createElement('button');
    rollbackBtn.type = 'button';
    rollbackBtn.className = 'ghost';
    rollbackBtn.textContent = 'Rollback to this';
    rollbackBtn.addEventListener('click', async () => {
      try {
        await sendJson(`/api/admin/releases/${release.id}/rollback`, { method: 'POST' });
        await loadReleases();
      } catch (error) {
        alert(error.message);
      }
    });
    actions.appendChild(rollbackBtn);
  }

  if (release.downloadPageUrl) {
    const link = document.createElement('a');
    link.href = release.downloadPageUrl;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = 'Public page';
    actions.appendChild(link);
  }

  if (release.apkPublicUrl) {
    const apkLink = document.createElement('a');
    apkLink.href = release.apkPublicUrl;
    apkLink.target = '_blank';
    apkLink.rel = 'noreferrer';
    apkLink.textContent = 'APK file';
    actions.appendChild(apkLink);
  }

  return item;
}

function renderReleases() {
  releasesList.innerHTML = '';
  if (state.releases.length === 0) {
    releasesList.innerHTML = '<div class="release-item empty-state">No releases yet.</div>';
    return;
  }
  state.releases.forEach((release) => releasesList.appendChild(renderReleaseItem(release)));
}

async function loadReleases() {
  const data = await sendJson('/api/admin/releases');
  state.releases = data.releases || [];
  state.currentLive = data.currentLive || null;
  renderCurrentLive();
  renderReleases();
}

draftForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(draftForm);
  const payload = {
    releaseLine: formData.get('releaseLine'),
    releaseKind: formData.get('releaseKind'),
    mandatory: formData.get('mandatory') === 'on',
    releaseNotes: formData.get('releaseNotes'),
  };
  if (payload.releaseKind === 'contentPatch') {
    payload.contentManifest = formData.get('contentManifest');
  }

  setStatus(draftStatus, 'Creating draft…');
  try {
    await sendJson('/api/admin/releases/draft', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    draftForm.reset();
    draftForm.querySelector('[name="releaseLine"]').value = '2.0';
    releaseKind.value = 'apkRelease';
    toggleContentManifestField();
    setStatus(draftStatus, 'Draft created successfully.');
    await loadReleases();
  } catch (error) {
    setStatus(draftStatus, error.message, true);
  }
});

releaseKind.addEventListener('change', toggleContentManifestField);
refreshBtn.addEventListener('click', () => loadReleases().catch((error) => alert(error.message)));
logoutBtn.addEventListener('click', async () => {
  await sendJson('/api/admin/auth/logout', { method: 'POST' });
  window.location.href = '/release-center/login';
});

toggleContentManifestField();
loadReleases().catch((error) => {
  console.error(error);
  alert(error.message);
});
