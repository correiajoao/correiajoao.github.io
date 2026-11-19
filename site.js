document.documentElement.classList.add('js');

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const classesMenu = document.getElementById('classesMenu');
const classesSummary = classesMenu.querySelector('summary');

function setMenuOpen(open) {
  navLinks.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.firstElementChild.textContent = open ? '×' : '☰';
}

navToggle.addEventListener('click', () => {
  setMenuOpen(!navLinks.classList.contains('open'));
});

navLinks.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;

  if (link.id === 'languageSwitch') {
    link.hash = window.location.hash;
  }

  if (navLinks.classList.contains('open')) navToggle.focus();
  setMenuOpen(false);
  classesMenu.open = false;
});

document.addEventListener('click', event => {
  if (!classesMenu.contains(event.target)) classesMenu.open = false;
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;

  if (classesMenu.open) {
    classesMenu.open = false;
    classesSummary.focus();
  } else if (navLinks.classList.contains('open')) {
    setMenuOpen(false);
    navToggle.focus();
  }
});

const sectionLinks = navLinks.querySelectorAll('a[href^="#"]');
const activeSectionObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;

    const hash = '#' + entry.target.id;
    sectionLinks.forEach(link => link.classList.toggle('active', link.hash === hash));
    classesSummary.classList.toggle('active', hash === '#classes');
  }
}, { rootMargin: '-40% 0px -55% 0px' });

document.querySelectorAll('section[id]').forEach(section => activeSectionObserver.observe(section));

const siteBase = new URL('.', document.currentScript.src);
const isEnglish = document.documentElement.lang === 'en';
for (const [sectionId, resources] of Object.entries(classLinks)) {
  if (!resources.length) continue;

  const list = document.createElement('ul');
  for (const resource of resources) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = new URL(resource.url, siteBase).href;
    link.textContent = isEnglish && resource.en ? resource.en : resource.pt;
    item.append(link);
    list.append(item);
  }

  document.querySelector('#' + sectionId + ' p').replaceWith(list);
}
