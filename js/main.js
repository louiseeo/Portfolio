// ============================================================
// main.js
// Loads data.json and renders all repeatable content dynamically.
// Nothing in Skills / Projects / Education / Experience /
// Certifications / Life Beyond Coding is hardcoded in the HTML —
// add or edit an entry in data.json and it shows up here
// automatically.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    loadPortfolioData();
});

// ---- Mobile navigation (static UI, not data-driven) ----
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const isOpen = mobileMenu.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 900) {
            mobileMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', false);
        }
    });
}

// ---- Fetch + render pipeline ----
async function loadPortfolioData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        renderProfile(data.profile);
        renderAbout(data.about);
        renderSkills(data.skills);
        renderProjects(data.projects);
        renderTimeline('education-container', data.education, { orgKey: 'school' });
        renderTimeline('experience-container', data.experience, { orgKey: 'org' });
        renderCertifications(data.certifications);
        renderBeyondCoding(data.beyondCoding);
    } catch (err) {
        // If data.json is missing or malformed, fail loudly in the
        // console rather than silently leaving empty sections.
        console.error('Could not load data.json:', err);
    }
}

// ---- Home / Introduction ----
function renderProfile(profile) {
    if (!profile) return;

    document.title = `${profile.name} — ${profile.role}`;

    document.querySelectorAll('[data-field="name"]').forEach(el => el.textContent = profile.name);
    document.querySelectorAll('[data-field="role"]').forEach(el => el.textContent = profile.role);
    document.querySelectorAll('[data-field="tagline"]').forEach(el => el.textContent = `// ${profile.tagline}`);

    const photo = document.querySelector('[data-field="photo"]');
    if (photo && profile.photo) {
        photo.src = profile.photo;
        photo.alt = `Photo of ${profile.name}`;
    }

    const emailLink = document.querySelector('[data-field="email-link"]');
    if (emailLink && profile.email) emailLink.href = `mailto:${profile.email}`;

    const githubLink = document.querySelector('[data-field="github-link"]');
    if (githubLink && profile.github) githubLink.href = profile.github;

    const facebookLink = document.querySelector('[data-field="facebook-link"]');
    if (facebookLink && profile.facebook) facebookLink.href = profile.facebook;

    const year = document.querySelector('[data-field="year"]');
    if (year) year.textContent = new Date().getFullYear();
}

// ---- About Me ----
function renderAbout(about) {
    const container = document.getElementById('about-content');
    if (!container || !about) return;

    container.innerHTML = '';
    about.paragraphs.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        container.appendChild(p);
    });
}

// ---- Skills (grouped, with a level bar per skill) ----
function renderSkills(skills) {
    const container = document.getElementById('skills-container');
    if (!container || !skills) return;

    container.innerHTML = '';

    skills.forEach(group => {
        const groupEl = document.createElement('div');
        groupEl.className = 'skill-group';

        const heading = document.createElement('h3');
        heading.textContent = group.category;
        groupEl.appendChild(heading);

        group.items.forEach(skill => {
            const row = document.createElement('div');
            row.className = 'skill-row';

            const label = document.createElement('div');
            label.className = 'skill-row-label';
            label.innerHTML = `<span>${skill.name}</span><span>${skill.level}%</span>`;

            const track = document.createElement('div');
            track.className = 'skill-bar-track';

            const fill = document.createElement('div');
            fill.className = 'skill-bar-fill';
            fill.style.width = `${skill.level}%`;

            track.appendChild(fill);
            row.appendChild(label);
            row.appendChild(track);
            groupEl.appendChild(row);
        });

        container.appendChild(groupEl);
    });
}

// ---- Projects (min. 3 cards, each from one JSON object) ----
function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container || !projects) return;

    container.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('article');
        card.className = 'project-card';

        const thumb = document.createElement('div');
        thumb.className = 'project-thumb';
        thumb.setAttribute('aria-hidden', 'true');
        if (project.image) thumb.style.backgroundImage = `url(${project.image})`;

        const info = document.createElement('div');
        info.className = 'project-info';

        const title = document.createElement('h3');
        title.textContent = project.title;

        const desc = document.createElement('p');
        desc.textContent = project.description;

        const tags = document.createElement('div');
        tags.className = 'project-tags';
        (project.tags || []).forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            tags.appendChild(span);
        });

        const link = document.createElement('a');
        link.className = 'project-link';
        link.href = project.link || '#';
        link.textContent = 'View project ➝';

        info.append(title, desc, tags, link);
        card.append(thumb, info);
        container.appendChild(card);
    });
}

// ---- Education / Experience timelines ----
function renderTimeline(containerId, entries, { orgKey }) {
    const container = document.getElementById(containerId);
    if (!container || !entries) return;

    container.innerHTML = '';

    entries.forEach(entry => {
        const item = document.createElement('div');
        item.className = 'timeline-item';

        const period = document.createElement('div');
        period.className = 'timeline-period';
        period.textContent = entry.period;

        const title = document.createElement('h3');
        title.textContent = entry.title;

        const org = document.createElement('div');
        org.className = 'timeline-org';
        org.textContent = entry[orgKey];

        const desc = document.createElement('p');
        desc.textContent = entry.description;

        item.append(period, title, org, desc);
        container.appendChild(item);
    });
}

// ---- Certifications ----
// ---- Certifications ----
function renderCertifications(certifications) {
    const container = document.getElementById('certifications-container');
    if (!container || !certifications) return;

    container.innerHTML = '';

    certifications.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'cert-card';

        const badge = document.createElement('div');
        badge.className = 'cert-badge';
        const badgeImg = document.createElement('img');
        badgeImg.src = cert.image;
        badgeImg.alt = '';
        badge.appendChild(badgeImg);

        badge.style.cursor = 'pointer';
        badge.setAttribute('role', 'button');
        badge.setAttribute('aria-label', `View ${cert.title} certificate`);
        badge.addEventListener('click', () => openLightbox(cert.image, cert.title));

        const info = document.createElement('div');
        info.className = 'cert-info';

        const title = document.createElement('h3');
        title.textContent = cert.title;

        const issuer = document.createElement('div');
        issuer.className = 'cert-issuer';
        issuer.textContent = cert.issuer;

        const date = document.createElement('span');
        date.className = 'cert-date';
        date.textContent = cert.date;

        info.append(title, issuer, date);

        if (cert.link && cert.link !== '#') {
            const link = document.createElement('a');
            link.className = 'cert-link';
            link.href = cert.link;
            link.textContent = 'View credential ➝';
            link.target = '_blank';
            link.rel = 'noopener';
            info.appendChild(link);
        }

        card.append(badge, info);
        container.appendChild(card);
    });
}

// ---- Lightbox: click a small image to view it full-size ----
function openLightbox(src, alt) {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    img.className = 'lightbox-image';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '✕';

    overlay.append(img, closeBtn);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden'; // stop background scroll

    const close = () => {
        overlay.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKeydown);
    };
    const onKeydown = (e) => { if (e.key === 'Escape') close(); };

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close(); // click outside the image
    });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', onKeydown);
}

// ---- Life Beyond Coding ----
function renderBeyondCoding(items) {
    const container = document.getElementById('beyond-container');
    if (!container || !items) return;

    container.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'beyond-card';

        const img = document.createElement('img');
        img.className = 'beyond-photo';
        img.src = item.image;
        img.alt = item.title;
        card.appendChild(img);

        const body = document.createElement('div');
        body.className = 'beyond-body';

        const title = document.createElement('h3');
        title.textContent = item.title;

        const desc = document.createElement('p');
        desc.textContent = item.description;

        body.append(title, desc);
        card.appendChild(body);
        container.appendChild(card);
    });
}
