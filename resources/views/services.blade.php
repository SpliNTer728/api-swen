<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Status — Services</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0b0d10;
      --surface: #12151a;
      --border: #1e2330;
      --text: #e8eaf0;
      --muted: #556070;
      --green: #2dff9a;
      --red: #ff4d6a;
      --yellow: #ffd166;
      --accent: #3d8eff;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Syne', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* ── Grid background ── */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 48px 48px;
      opacity: .35;
      pointer-events: none;
      z-index: 0;
    }

    /* ── Glow orb ── */
    body::after {
      content: '';
      position: fixed;
      top: -200px; left: 50%;
      transform: translateX(-50%);
      width: 700px; height: 500px;
      background: radial-gradient(ellipse, rgba(61,142,255,.12) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    .wrap {
      position: relative;
      z-index: 1;
      max-width: 820px;
      margin: 0 auto;
      padding: 60px 24px 80px;
    }

    /* ── Header ── */
    header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 56px;
      animation: fadeUp .6s ease both;
    }

    .brand {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .brand-label {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: var(--muted);
    }

    h1 {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -.02em;
    }

    .global-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 18px;
      border-radius: 100px;
      border: 1px solid;
      font-family: 'DM Mono', monospace;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .05em;
      white-space: nowrap;
      margin-top: 8px;
      transition: all .3s;
    }

    .global-badge.all-ok {
      color: var(--green);
      border-color: rgba(45,255,154,.25);
      background: rgba(45,255,154,.06);
    }
    .global-badge.degraded {
      color: var(--yellow);
      border-color: rgba(255,209,102,.25);
      background: rgba(255,209,102,.06);
    }
    .global-badge.outage {
      color: var(--red);
      border-color: rgba(255,77,106,.25);
      background: rgba(255,77,106,.06);
    }

    .badge-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: currentColor;
    }

    .badge-dot.pulse {
      animation: pulse 2s ease infinite;
    }

    /* ── Section label ── */
    .section-label {
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: .25em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 16px;
    }

    /* ── Service cards ── */
    .services {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-bottom: 48px;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 22px 28px;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      transition: border-color .25s, background .25s;
      animation: fadeUp .5s ease both;
    }

    .card:hover { background: #161a22; border-color: #2a3040; }

    .card-main { display: flex; align-items: center; gap: 18px; }

    .card-icon {
      width: 42px; height: 42px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }

    .card-icon.green  { background: rgba(45,255,154,.1);  }
    .card-icon.red    { background: rgba(255,77,106,.1);  }
    .card-icon.yellow { background: rgba(255,209,102,.1); }

    .card-info { display: flex; flex-direction: column; gap: 4px; }

    .card-name {
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: -.01em;
    }

    .card-desc {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      color: var(--muted);
    }

    .card-right { display: flex; align-items: center; gap: 20px; }

    .uptime-bar {
      display: flex;
      align-items: flex-end;
      gap: 2px;
      height: 28px;
    }

    .uptime-bar span {
      display: block;
      width: 4px;
      border-radius: 2px;
      background: var(--border);
      transition: background .2s;
    }

    .status-pill {
      display: flex;
      align-items: center;
      gap: 7px;
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: .06em;
      padding: 5px 13px;
      border-radius: 100px;
      border: 1px solid;
      min-width: 80px;
      justify-content: center;
    }

    .status-pill.up     { color: var(--green);  border-color: rgba(45,255,154,.3);  background: rgba(45,255,154,.08);  }
    .status-pill.down   { color: var(--red);    border-color: rgba(255,77,106,.3);  background: rgba(255,77,106,.08);  }
    .status-pill.warn   { color: var(--yellow); border-color: rgba(255,209,102,.3); background: rgba(255,209,102,.08); }

    .status-pill .dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: currentColor;
    }

    .status-pill.up .dot { animation: pulse 2s ease infinite; }

    /* ── Metrics row ── */
    .metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 48px;
      animation: fadeUp .7s ease .1s both;
    }

    .metric {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 22px 24px;
    }

    .metric-value {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -.03em;
      line-height: 1;
      margin-bottom: 6px;
    }

    .metric-value.green  { color: var(--green);  }
    .metric-value.red    { color: var(--red);    }
    .metric-value.accent { color: var(--accent); }

    .metric-label {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      color: var(--muted);
      letter-spacing: .1em;
      text-transform: uppercase;
    }

    /* ── Incidents ── */
    .incidents { animation: fadeUp .7s ease .2s both; }

    .incident {
      border-left: 2px solid var(--border);
      padding: 12px 0 12px 20px;
      position: relative;
    }
    .incident::before {
      content: '';
      position: absolute;
      left: -5px; top: 18px;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--muted);
      border: 2px solid var(--bg);
    }
    .incident.resolved::before { background: var(--green); }
    .incident.active::before   { background: var(--red); animation: pulse 1.5s ease infinite; }

    .incident-title {
      font-weight: 700;
      font-size: .9rem;
      margin-bottom: 4px;
    }
    .incident-meta {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      color: var(--muted);
    }
    .incident-tag {
      display: inline-block;
      padding: 2px 9px;
      border-radius: 4px;
      font-size: 10px;
      font-family: 'DM Mono', monospace;
      margin-left: 8px;
      font-weight: 500;
    }
    .incident-tag.resolved { background: rgba(45,255,154,.1);  color: var(--green);  }
    .incident-tag.active   { background: rgba(255,77,106,.1);  color: var(--red);    }

    /* ── Footer ── */
    footer {
      margin-top: 60px;
      padding-top: 24px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      color: var(--muted);
      animation: fadeUp .7s ease .3s both;
    }

    .refresh-btn {
      background: none;
      border: 1px solid var(--border);
      color: var(--muted);
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      padding: 7px 14px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: color .2s, border-color .2s;
    }
    .refresh-btn:hover { color: var(--text); border-color: #3a4050; }

    /* ── Animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: .35; }
    }

    @media (max-width: 580px) {
      .metrics { grid-template-columns: repeat(2, 1fr); }
      .uptime-bar { display: none; }
      header { flex-direction: column; gap: 16px; }
    }
  </style>
</head>
<body>
<div class="wrap">

  <!-- Header -->
  <header>
    <div class="brand">
      <span class="brand-label">Server Fluxplay</span>
      <h1>Status</h1>
    </div>
    <div class="global-badge all-ok" id="globalBadge">
      <span class="badge-dot pulse"></span>
      <span id="globalText">Tous les systèmes opérationnels</span>
    </div>
  </header>

  <!-- Services -->
  <p class="section-label">Services</p>
  <div class="services" id="serviceList"></div>

  <!-- Metrics -->
  <div class="metrics">
    <div class="metric">
      <div class="metric-value green" id="metricUp">—</div>
      <div class="metric-label">Services en ligne</div>
    </div>
    <div class="metric">
      <div class="metric-value accent" id="metricUptime">—</div>
      <div class="metric-label">Uptime 30j (moy.)</div>
    </div>
    <div class="metric">
      <div class="metric-value accent" id="metricLatency">—</div>
      <div class="metric-label">Latence moy. (ms)</div>
    </div>
  </div>

  <!-- Incidents -->
  <p class="section-label">Historique des incidents</p>
  <div class="incidents">
    <div class="incident active">
      <div class="incident-title">
        API Gateway — latence élevée
        <span class="incident-tag active">En cours</span>
      </div>
      <div class="incident-meta">Débuté il y a 42 min · Équipe notifiée</div>
    </div>
    <div class="incident resolved">
      <div class="incident-title">
        Base de données — connexions saturées
        <span class="incident-tag resolved">Résolu</span>
      </div>
      <div class="incident-meta">28 fév. 2026 · Durée : 18 min</div>
    </div>
    <div class="incident resolved">
      <div class="incident-title">
        CDN — erreurs 502 intermittentes
        <span class="incident-tag resolved">Résolu</span>
      </div>
      <div class="incident-meta">14 fév. 2026 · Durée : 5 min</div>
    </div>
  </div>

  <!-- Footer -->
  <footer>
    <span>Dernière vérification : <span id="lastCheck">—</span></span>
    <button class="refresh-btn" onclick="refresh()">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
      Actualiser
    </button>
  </footer>

</div>

<script>
  /* ── Service data — edit this! ── */
  const SERVICES = [
    {
      name: "Fluxplay",
      desc: "app.monserveur.io · Port 9084",
      icon: "🌐",
      status: "up",           // "up" | "down" | "warn"
      uptime: 99.98,
      latency: 42,
      history: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1]
    },
    {
      name: "Swen",
      desc: "api.monserveur.io · Port 80",
      icon: "🌐",
      status: "up",
      uptime: 99.2,
      latency: 310,
      history: [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1]
    },
    {
      name: "Base de données",
      desc: "db.monserveur.io · MysQL 5.7",
      icon: "🗄️",
      status: "up",
      uptime: 100,
      latency: 8,
      history: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    },
    {
      name: "Stockage & CDN",
      desc: "cdn.monserveur.io · MinIO / S3",
      icon: "📦",
      status: "up",
      uptime: 99.99,
      latency: 15,
      history: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    },
    {
      name: "Monitoring & Logs",
      desc: "grafana.monserveur.io · Grafana",
      icon: "📊",
      status: "up",
      uptime: 94.5,
      latency: null,
      history: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0]
    }
  ];

  const statusLabels = { up: "En ligne", down: "Hors ligne", warn: "Dégradé" };

  function barHeight(val) {
    const base = [10,12,18,14,20,16,22,12,18,24];
    return base[Math.floor(Math.random() * base.length)];
  }

  function barColor(val, status) {
    if (!val) return 'rgba(255,77,106,.4)';
    if (status === 'warn') return 'rgba(255,209,102,.5)';
    return 'rgba(45,255,154,.5)';
  }

  function renderServices() {
    const list = document.getElementById('serviceList');
    list.innerHTML = '';

    SERVICES.forEach((s, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.animationDelay = `${i * 0.07}s`;

      const bars = s.history.map((v, idx) => {
        const h = 8 + Math.round((idx / s.history.length) * 16) + (v ? Math.random() * 6 : 0);
        return `<span style="height:${Math.max(4,h)}px;background:${barColor(v, s.status)}"></span>`;
      }).join('');

      card.innerHTML = `
        <div class="card-main">
          <div class="card-icon ${s.status}">${s.icon}</div>
          <div class="card-info">
            <div class="card-name">${s.name}</div>
            <div class="card-desc">${s.desc}${s.latency ? ' · ' + s.latency + ' ms' : ''}</div>
          </div>
        </div>
        <div class="card-right">
          <div class="uptime-bar">${bars}</div>
          <div class="status-pill ${s.status}">
            <span class="dot"></span>
            ${statusLabels[s.status]}
          </div>
        </div>
      `;
      list.appendChild(card);
    });
  }

  function renderMetrics() {
    const total = SERVICES.length;
    const upCount = SERVICES.filter(s => s.status === 'up' || s.status === 'warn').length;
    const onlineStr = `${upCount}/${total}`;
    const avgUptime = (SERVICES.reduce((a, s) => a + s.uptime, 0) / total).toFixed(2) + '%';
    const latencies = SERVICES.filter(s => s.latency).map(s => s.latency);
    const avgLatency = latencies.length ? Math.round(latencies.reduce((a,b) => a+b, 0) / latencies.length) + ' ms' : '—';

    document.getElementById('metricUp').textContent = onlineStr;
    document.getElementById('metricUptime').textContent = avgUptime;
    document.getElementById('metricLatency').textContent = avgLatency;

    // Color uptime
    const el = document.getElementById('metricUp');
    const downCount = SERVICES.filter(s => s.status === 'down').length;
    el.className = 'metric-value ' + (downCount > 0 ? 'red' : 'green');
  }

  function renderGlobal() {
    const badge = document.getElementById('globalBadge');
    const text  = document.getElementById('globalText');
    const hasDown = SERVICES.some(s => s.status === 'down');
    const hasWarn = SERVICES.some(s => s.status === 'warn');
    badge.className = 'global-badge ' + (hasDown ? 'outage' : hasWarn ? 'degraded' : 'all-ok');
    text.textContent = hasDown ? 'Panne détectée' : hasWarn ? 'Performances dégradées' : 'Tous les systèmes opérationnels';
  }

  function updateTime() {
    const now = new Date();
    document.getElementById('lastCheck').textContent =
      now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  function refresh() {
    renderServices();
    renderMetrics();
    renderGlobal();
    updateTime();
  }

  refresh();
  setInterval(updateTime, 1000);
</script>
</body>
</html>
