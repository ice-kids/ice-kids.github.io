document.documentElement.classList.add('js');

// Menu mobile
const btnMenu = document.getElementById('hamburguer');
const menu = document.getElementById('menu');
btnMenu.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  btnMenu.setAttribute('aria-expanded', aberto);
  btnMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('aberto');
  btnMenu.setAttribute('aria-expanded', false);
}));

// Sombra no cabeçalho ao rolar
const topo = document.getElementById('topo');
addEventListener('scroll', () => topo.classList.toggle('rolou', scrollY > 10), { passive: true });

// Destaca o item do menu da seção visível
const links = [...menu.querySelectorAll('a')];
const secoes = links.map(a => document.querySelector(a.getAttribute('href')));
const marcaAtivo = () => {
  const y = scrollY + innerHeight * 0.35;
  let atual = 0;
  secoes.forEach((s, i) => { if (s && s.offsetTop <= y) atual = i; });
  if (scrollY > 0 && innerHeight + scrollY >= document.body.scrollHeight - 4) atual = links.length - 1;
  links.forEach((a, i) => a.classList.toggle('ativo', i === atual));
};
addEventListener('scroll', marcaAtivo, { passive: true });
marcaAtivo();

// Animação de entrada
const obs = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visivel'); obs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.revela').forEach((el, i) => {
  if (el.classList.contains('sabor')) {
    el.style.transitionDelay = (i % 10) * 50 + 'ms';
    el.addEventListener('transitionend', () => (el.style.transitionDelay = ''), { once: true });
  }
  obs.observe(el);
});

document.getElementById('ano').textContent = new Date().getFullYear();
