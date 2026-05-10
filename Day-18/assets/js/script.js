const BD = [
    { id: 'b1', name: 'Rahul Mehta', init: 'R', bg: '#dbeafe', tc: '#1d4ed8', svc: 'AC Repair — Standard ❄️', date: '15 Mar', time: '10:00 AM', addr: 'Indiranagar, Bangalore', price: '₹799', status: 'pending' },
    { id: 'b2', name: 'Priya Sharma', init: 'P', bg: '#ede9fe', tc: '#6d28d9', svc: 'AC Repair — Premium ❄️', date: '15 Mar', time: '02:00 PM', addr: 'Whitefield, Bangalore', price: '₹1,299', status: 'pending' },
    { id: 'b3', name: 'Ananya Singh', init: 'A', bg: '#dcfce7', tc: '#15803d', svc: 'Plumbing — Pipe Leak 🔧', date: '16 Mar', time: '11:00 AM', addr: 'Koramangala, Bangalore', price: '₹499', status: 'pending' },
    { id: 'b4', name: 'Vikram Nair', init: 'V', bg: '#fef9c3', tc: '#854d0e', svc: 'AC Service — Annual 🧹', date: '13 Mar', time: '09:00 AM', addr: 'HSR Layout, Bangalore', price: '₹999', status: 'accepted' },
    { id: 'b5', name: 'Deepa Iyer', init: 'D', bg: '#fee2e2', tc: '#991b1b', svc: 'Electrician — Fan ⚡', date: '12 Mar', time: '04:00 PM', addr: 'Jayanagar, Bangalore', price: '₹349', status: 'completed' },
];
const EDB = {
    week: { labels: ['Somwar', 'Mangal', 'Budh', 'Guruvar', 'Shukra', 'Shanivaar', 'Ravivar'], data: [1200, 800, 1550, 2200, 950, 1299, 450] },
    month: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [7200, 9100, 8450, 8050] },
    year: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], data: [28000, 31000, 35000, 38000, 42000, 36000, 29000, 33000, 37000, 40000, 43000, 39000] },
};
const REV = [
    { name: 'Rahul M.', rating: 5, text: 'Bahut achha kaam! AC bilkul sahi. Very professional.', date: '12 Mar' },
    { name: 'Deepa I.', rating: 5, text: 'Time pe aaye, kaam mast tha. Definitely recommend!', date: '11 Mar' },
    { name: 'Vikram N.', rating: 4, text: 'Good work. Thoda late aaye lekin kaam perfect.', date: '10 Mar' },
    { name: 'Ananya S.', rating: 5, text: '5 star! Priya ji ne pipe leak instantly fix kar di.', date: '9 Mar' },
];
const TXN = [
    { svc: 'AC Repair — Standard', cust: 'Rahul Mehta', amt: '₹679', date: '13 Mar', paid: true },
    { svc: 'AC Service — Annual', cust: 'Vikram Nair', amt: '₹849', date: '13 Mar', paid: true },
    { svc: 'Electrician Service', cust: 'Deepa Iyer', amt: '₹297', date: '12 Mar', paid: true },
    { svc: 'AC Repair — Premium', cust: 'Sonal Mehta', amt: '₹1,104', date: '11 Mar', paid: true },
    { svc: 'Plumbing', cust: 'Rakesh Gupta', amt: '₹424', date: '10 Mar', paid: false },
];

let pendingCnt = 3, modalCb = null, curFilter = 'all';

const TITLES = {
    dashboard: ['Dashboard Overview', 'Aaj ka sara jaayza'],
    bookings: ['Booking Requests', 'Accept ya decline karo'],
    schedule: ['Aaj ka Schedule', 'Confirmed jobs timeline'],
    earnings: ['Kamai / Earnings', 'Apni earning track karo'],
    reviews: ['Reviews & Ratings', 'Customer feedback'],
    profile: ['Meri Profile', 'Info update karo'],
    settings: ['Settings', 'Preferences manage karo'],
};
function goto(tab, el) {
    document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.getElementById('page-' + tab).classList.add('active');
    if (el) el.classList.add('active');
    const t = TITLES[tab] || [tab, ''];
    document.querySelector('#tb-title h2').textContent = t[0];
    document.querySelector('#tb-title p').innerHTML = t[1];
    if (tab === 'earnings') setTimeout(buildChart2, 80);
    if (tab === 'reviews') renderReviews();
    if (window.innerWidth < 768) document.getElementById('sidebar').classList.remove('open');
}

function tick() {
    const n = new Date();
    const h = n.getHours(), m = String(n.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM', hh = h % 12 || 12;
    document.getElementById('live-clock').textContent = `${String(hh).padStart(2, '0')}:${m} ${ampm}`;
    const days = ['Ravivar', 'Somwar', 'Mangal', 'Budh', 'Guruwar', 'Shukra', 'Shanivaar'];
    const mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    document.getElementById('today-date').textContent = `${days[n.getDay()]}, ${n.getDate()} ${mons[n.getMonth()]} ${n.getFullYear()}`;
}
tick(); setInterval(tick, 1000);

function toast(msg, type = 'info') {
    const ic = { success: 'check-circle', error: 'times-circle', info: 'info-circle', warning: 'exclamation-triangle' };
    const t = document.createElement('div');
    t.className = `toast-item ${type}`;
    t.innerHTML = `<i class="fas fa-${ic[type] || 'info-circle'}"></i> ${msg}`;
    document.getElementById('toast-container').appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 350); }, 3000);
}

function showModal(title, body, label, cls, cb) {
    document.getElementById('m-title').textContent = title;
    document.getElementById('m-body').textContent = body;
    const btn = document.getElementById('m-ok');
    btn.textContent = label; btn.className = `btn ${cls}`;
    modalCb = cb;
    document.getElementById('mo').classList.add('open');
}
function closeModal(e) {
    if (e && e.target !== document.getElementById('mo')) return;
    document.getElementById('mo').classList.remove('open'); modalCb = null;
}
function doModalOk() {
    document.getElementById('mo').classList.remove('open');
    if (modalCb) modalCb(); modalCb = null;
}

function renderBookings() {
    const c = document.getElementById('b-list');
    const list = BD.filter(b => curFilter === 'all' ? true : b.status === curFilter);
    if (!list.length) { c.innerHTML = '<div class="empty"><i class="fas fa-calendar-times"></i><p>Koi booking nahi</p></div>'; return; }
    c.innerHTML = list.map(b => {
        const a = {
            pending: `<button class="btn btn-accept" onclick="acceptB('${b.id}')"><i class="fas fa-check"></i> Accept</button><button class="btn btn-decline" onclick="declineB('${b.id}')"><i class="fas fa-times"></i> Decline</button>`,
            accepted: `<button class="btn btn-start" onclick="startB('${b.id}')"><i class="fas fa-play"></i> Shuru Karo</button>`,
            'in-progress': `<button class="btn btn-complete" onclick="completeB('${b.id}')"><i class="fas fa-flag-checkered"></i> Complete</button>`,
            completed: `<span class="badge badge-complete"><i class="fas fa-check-circle"></i> Done!</span>`,
            declined: `<span class="badge badge-declined"><i class="fas fa-times-circle"></i> Declined</span>`,
        };
        const sc = { pending: 'badge-pending', accepted: 'badge-confirm', completed: 'badge-complete', declined: 'badge-declined', 'in-progress': 'badge-inprog' };
        const sl = { pending: 'Pending', accepted: 'Accepted', completed: 'Completed', declined: 'Declined', 'in-progress': 'In Progress 🔧' };
        const rc = { accepted: 'accepted', declined: 'declined', 'in-progress': 'in-progress', completed: 'completed-row' };
        return `<div class="booking-row ${rc[b.status] || ''}">
        <div class="b-avatar" style="background:${b.bg};color:${b.tc}">${b.init}</div>
        <div class="b-info">
            <h4>${b.svc}</h4>
            <div class="b-meta"><span><i class="fas fa-user"></i> ${b.name}</span><span><i class="fas fa-calendar"></i> ${b.date}, ${b.time}</span><span><i class="fas fa-map-marker-alt"></i> ${b.addr}</span></div>
        </div>
        <span class="b-price">${b.price}</span>
        <span class="badge ${sc[b.status]}">${sl[b.status]}</span>
        <div class="b-actions">${a[b.status] || ''}</div>
        </div>`;
    }).join('');
}
function filterB(f, el) {
    curFilter = f;
    document.querySelectorAll('#filter-btns .btn').forEach(b => { b.style.borderColor = 'var(--border)'; b.style.color = 'var(--muted)'; });
    if (el) { el.style.borderColor = 'var(--blue)'; el.style.color = 'var(--blue)'; }
    renderBookings();
}
function acceptB(id) {
    showModal('Booking Accept Karo?', 'Kya aap is booking ko accept karna chahte hain?', 'Accept Karo', 'btn-accept', () => {
        const b = BD.find(x => x.id === id);
        if (b) { b.status = 'accepted'; pendingCnt = Math.max(0, pendingCnt - 1); }
        renderBookings(); renderSchedule(); updatePC();
        toast(`✅ ${b?.name} ki booking accept ho gayi!`, 'success');
    });
}
function declineB(id) {
    showModal('Decline Karo?', 'Is customer ko kisi aur ke paas bheja jayega.', 'Decline', 'btn-decline', () => {
        const b = BD.find(x => x.id === id);
        if (b) { b.status = 'declined'; pendingCnt = Math.max(0, pendingCnt - 1); }
        renderBookings(); updatePC();
        toast('❌ Booking decline kar di', 'error');
    });
}
function startB(id) {
    const b = BD.find(x => x.id === id);
    if (b) b.status = 'in-progress';
    renderBookings(); renderSchedule();
    toast(`🔧 Job shuru! ${b?.name} ke paas navigate karo`, 'info');
}
function completeB(id) {
    showModal('Job Complete?', 'Kya kaam poora ho gaya aur payment collect ho gayi?', 'Complete Karo', 'btn-complete', () => {
        const b = BD.find(x => x.id === id);
        if (b) b.status = 'completed';
        renderBookings(); renderSchedule();
        toast(`🎉 Job complete! ${b?.price} payment record ho gayi`, 'success');
    });
}
function updatePC() {
    document.getElementById('nb-pending').textContent = pendingCnt;
    document.getElementById('d-stat-pend').textContent = pendingCnt;
    if (document.getElementById('d-pend-txt')) document.getElementById('d-pend-txt').textContent = pendingCnt + ' pending requests';
}

function renderSchedule() {
    const jobs = BD.filter(b => ['accepted', 'in-progress', 'completed'].includes(b.status));
    const c = document.getElementById('tl-list');
    if (!jobs.length) { c.innerHTML = '<div class="empty"><i class="fas fa-calendar-day"></i><p>Aaj koi confirmed job nahi</p></div>'; return; }
    const sc = { accepted: '#dbeafe', 'in-progress': '#ede9fe', completed: '#d1fae5' };
    const btn = {
        accepted: b => `<button class="btn btn-start" style="margin-top:7px" onclick="startB('${b.id}')"><i class="fas fa-play"></i> Shuru Karo</button>`,
        'in-progress': b => `<button class="btn btn-complete" style="margin-top:7px" onclick="completeB('${b.id}')"><i class="fas fa-flag-checkered"></i> Complete</button>`,
        completed: () => `<span class="badge badge-complete" style="margin-top:7px;display:inline-flex"><i class="fas fa-check-circle"></i> Done!</span>`
    };
    c.innerHTML = jobs.map(b => `
        <div class="tl-item">
            <div class="tl-dot" style="background:${sc[b.status] || '#f1f5f9'};color:${b.tc}">${b.init}</div>
            <div class="tl-info">
            <div class="tl-time">${b.time} · ${b.date}</div>
            <div class="tl-title">${b.svc}</div>
            <div class="tl-meta"><i class="fas fa-user"></i> ${b.name} &nbsp;·&nbsp; <i class="fas fa-map-marker-alt"></i> ${b.addr}</div>
            <div class="tl-meta" style="margin-top:3px"><strong style="color:var(--blue)">${b.price}</strong></div>
            ${(btn[b.status] || (() => ''))(b)}
            </div>
        </div>`).join('');
}

function dashStartJob() {
    showModal('Job Shuru Karo?', 'Rahul Mehta ke paas jaoge? Job start ho jayegi.', 'Shuru Karo!', 'btn-start', () => {
        const b = BD.find(x => x.id === 'b1');
        if (b) b.status = 'in-progress';
        renderSchedule();
        const btn = document.getElementById('dash-start-btn');
        if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> In Progress...'; btn.className = 'btn btn-complete'; btn.onclick = () => toast('Schedule tab mein complete karo!', 'info'); }
        toast('🔧 Job shuru! Navigate karo Indiranagar', 'info');
    });
}

let c1, c2;
function mkGrad(ctx, a, b) { const g = ctx.createLinearGradient(0, 0, 0, 260); g.addColorStop(0, a); g.addColorStop(1, b); return g; }

function buildChart1() {
    const el = document.getElementById('chart1'); if (!el) return;
    if (c1) c1.destroy();
    const ctx = el.getContext('2d');
    c1 = new Chart(ctx, { type: 'line', data: { labels: EDB.week.labels, datasets: [{ label: '₹', data: EDB.week.data, borderColor: '#2563eb', backgroundColor: mkGrad(ctx, 'rgba(37,99,235,.18)', 'rgba(37,99,235,.01)'), tension: .42, fill: true, pointBackgroundColor: '#fff', pointBorderColor: '#2563eb', pointBorderWidth: 2.5, pointRadius: 4, pointHoverRadius: 6 }] }, options: cOpts() });
}
function buildChart2() {
    const el = document.getElementById('chart2'); if (!el || c2) return;
    const ctx = el.getContext('2d');
    c2 = new Chart(ctx, { type: 'bar', data: { labels: EDB.week.labels, datasets: [{ label: '₹', data: EDB.week.data, backgroundColor: EDB.week.data.map((_, i) => i === 3 ? '#2563eb' : 'rgba(37,99,235,.25)'), borderRadius: 8, borderSkipped: false }] }, options: cOpts() });
}
function cOpts() {
    return { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1e40af', titleColor: '#bfdbfe', bodyColor: '#fff', padding: 10, cornerRadius: 10, callbacks: { label: c => ' ₹' + c.raw.toLocaleString('en-IN') } } }, scales: { x: { grid: { display: false }, ticks: { font: { size: 11, family: 'Outfit' }, color: '#94a3b8' } }, y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11, family: 'Outfit' }, color: '#94a3b8', callback: v => '₹' + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v) } } } };
}
function sw1(p, el) {
    document.querySelectorAll('#page-dashboard .c-tab').forEach(t => t.classList.remove('active')); el.classList.add('active');
    if (c1) { c1.data.labels = EDB[p].labels; c1.data.datasets[0].data = EDB[p].data; c1.update(); }
}
function sw2(p, el) {
    document.querySelectorAll('#page-earnings .c-tab').forEach(t => t.classList.remove('active')); el.classList.add('active');
    if (c2) { const d = EDB[p]; c2.data.labels = d.labels; c2.data.datasets[0].data = d.data; c2.data.datasets[0].backgroundColor = d.data.map((_, i) => i === d.data.indexOf(Math.max(...d.data)) ? '#2563eb' : 'rgba(37,99,235,.25)'); c2.update(); }
}

function renderEarnings() {
    document.getElementById('earn-list').innerHTML = TXN.map(t => `
    <div class="earn-row">
        <div><div class="e-title">${t.svc}</div><div class="e-meta"><i class="fas fa-user"></i> ${t.cust} &nbsp;·&nbsp; ${t.date}</div></div>
        <div style="text-align:right"><div class="e-amt${t.paid ? '' : ' pend'}">${t.amt}</div><span class="badge ${t.paid ? 'badge-complete' : 'badge-pending'}" style="margin-top:3px">${t.paid ? 'Paid ✓' : 'Pending'}</span></div>
    </div>`).join('');
}

function renderReviews() {
    const bars = [{ s: 5, c: 98 }, { s: 4, c: 18 }, { s: 3, c: 5 }, { s: 2, c: 2 }, { s: 1, c: 1 }];
    document.getElementById('rating-bars').innerHTML = bars.map(b => `
    <div style="display:flex;align-items:center;gap:7px;margin-bottom:5px">
        <span style="font-size:.68rem;color:var(--muted);width:12px;text-align:right">${b.s}</span>
        <div style="flex:1;height:5px;background:var(--border);border-radius:100px;overflow:hidden">
        <div style="height:100%;width:${Math.round(b.c / 124 * 100)}%;background:${b.s >= 4 ? '#f59e0b' : '#94a3b8'};border-radius:100px"></div>
        </div>
        <span style="font-size:.68rem;color:var(--muted);width:18px">${b.c}</span>
    </div>`).join('');
    document.getElementById('rev-list').innerHTML = REV.map(r => `
    <div class="rev-card">
        <div style="display:flex;justify-content:space-between;margin-bottom:7px">
        <div style="display:flex;align-items:center;gap:8px">
            <div style="width:32px;height:32px;background:linear-gradient(135deg,var(--blue),#7c3aed);border-radius:9px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:.78rem">${r.name[0]}</div>
            <div><div style="font-weight:700;font-size:.85rem">${r.name}</div><div style="font-size:.68rem;color:var(--muted)">${r.date}</div></div>
        </div>
        <div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        </div>
        <p style="font-size:.81rem;color:var(--muted);line-height:1.6">"${r.text}"</p>
    </div>`).join('');
}

function toggleNotif() {
    document.getElementById('notif-panel').classList.toggle('open');
    document.getElementById('notif-dot').style.display = 'none';
}
function clearNotifs() {
    document.getElementById('notif-list').innerHTML = '<div class="empty" style="padding:20px"><i class="fas fa-bell-slash"></i><p>Koi notification nahi</p></div>';
    document.getElementById('notif-panel').classList.remove('open');
    toast('Notifications clear ho gayi', 'info');
}
document.addEventListener('click', e => {
    const p = document.getElementById('notif-panel');
    const b = document.getElementById('notif-btn');
    if (p.classList.contains('open') && !p.contains(e.target) && !b.contains(e.target)) p.classList.remove('open');
});

function toggleSW(el, name) {
    el.classList.toggle('on');
    toast(el.classList.contains('on') ? `✅ ${name} on kar diya` : `⚫ ${name} off kar diya`, 'info');
}
function toggleAvail(el) {
    el.classList.toggle('on');
    const on = el.classList.contains('on');
    document.getElementById('online-dot').style.background = on ? '#22c55e' : '#94a3b8';
    toast(on ? '🟢 Aap online hain! Customers dekh sakte hain' : '⚫ Aap offline hain', on ? 'success' : 'info');
}

function saveProfile(e) { e.preventDefault(); toast('✅ Profile save ho gayi!', 'success'); }

function doLogout() {
    showModal('Logout karna chahte ho?', 'Logout ke baad dobara login karna hoga.', 'Logout', 'btn-decline', () => {
        toast('Logging out...', 'info');
        setTimeout(() => { window.location.href = 'main.html'; }, 1200);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    renderBookings();
    renderSchedule();
    renderEarnings();
    setTimeout(buildChart1, 120);
});