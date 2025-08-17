(function () {
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));

  // Mobile nav toggle
  const btn = qs('.nav-toggle');
  const nav = qs('#nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      btn.setAttribute('aria-expanded', String(!open));
    });
  }

  // Smooth scroll enhancement for anchor links
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = qs('#' + CSS.escape(id));
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', '#' + id);
      }
    });
  });

  // Year in footer
  const year = new Date().getFullYear();
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = year;

  // Join form (client-side demo only)
  const form = qs('#join-form');
  const hint = qs('#join-hint');
  if (form && hint) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        hint.textContent = 'Please enter a valid name and email.';
        hint.style.color = '#b22f22';
        return;
      }
      hint.textContent = 'Thanks! You’re on the list. (Demo only)';
      hint.style.color = '#1b602e';
      form.reset();
    });
  }

  // Sample events (you can swap this with your backend later)
  const events = [
    {{ date: '2025-09-01', title: 'Founders Assembly', where: 'Online — Global' }},
    {{ date: '2025-10-12', title: 'Design a Code of Ethics Workshop', where: 'Austin, TX' }},
    {{ date: '2025-11-05', title: 'Poster Night: Propaganda Remix', where: 'Brooklyn, NY' }},
  ];
  const timeline = qs('#event-timeline');
  if (timeline) {
    events.forEach(ev => {{
      const li = document.createElement('li');
      li.innerHTML = `<time datetime="${{ev.date}}">${{new Date(ev.date).toLocaleDateString(undefined, {{ month: 'short', day: 'numeric', year: 'numeric' }})}}</time>
        <div class="event-body"><strong>${{ev.title}}</strong><br/><span>${{ev.where}}</span></div>`;
      timeline.appendChild(li);
    }});
  }
})();