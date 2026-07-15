/* ============================================================
   CLÓVIS CABELEIREIROS — JavaScript Principal
   Modo Noturno/Diurno + Animações + Funcionalidades
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. MODO NOTURNO / DIURNO
  // ============================================================
  const themeToggle = document.getElementById('themeToggle');
  
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('clovisTheme', theme);
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem('clovisTheme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Aplicar tema salvo ou preferência do sistema
  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
      
      // Animação no botão
      themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
      setTimeout(() => {
        themeToggle.style.transform = 'scale(1) rotate(0deg)';
      }, 200);
    });
  }

  // ============================================================
  // 2. MENU MOBILE (Hamburguer)
  // ============================================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  const body = document.body;

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navList.classList.toggle('active');
      body.classList.toggle('menu-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });

    document.addEventListener('click', (e) => {
      if (navList.classList.contains('active') &&
          !navList.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
  }

  // ============================================================
  // 3. HEADER SCROLL EFFECT
  // ============================================================
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ============================================================
  // 4. NAVEGAÇÃO ATIVA POR PÁGINA
  // ============================================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ============================================================
  // 5. INTERSECTION OBSERVER — ANIMAÇÕES AO ROLAR
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ============================================================
  // 6. SCROLL SUAVE PARA ÂNCORAS
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================================
  // 7. CONTADOR ANIMADO NA SEÇÃO SOBRE
  // ============================================================
  function animateCounter(el, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);
      
      el.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + (target >= 1000 ? '+' : '+');
      }
    }
    
    requestAnimationFrame(update);
  }

  const statNumbers = document.querySelectorAll('.stat-numero[data-target]');
  
  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target, 10);
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  } else {
    statNumbers.forEach(el => {
      el.textContent = el.dataset.target + '+';
    });
  }

  // ============================================================
  // 8. SISTEMA DE AGENDAMENTO — FUNÇÕES COMPARTILHADAS
  // ============================================================

  window.getAgendamentos = function() {
    try {
      return JSON.parse(localStorage.getItem('clovisAgendamentos')) || [];
    } catch {
      return [];
    }
  };

  window.salvarAgendamento = function(agendamento) {
    try {
      const agendamentos = window.getAgendamentos();
      agendamento.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
      agendamento.criadoEm = new Date().toISOString();
      agendamentos.push(agendamento);
      localStorage.setItem('clovisAgendamentos', JSON.stringify(agendamentos));
      return true;
    } catch (e) {
      console.error('Erro ao salvar agendamento:', e);
      return false;
    }
  };

  window.removerAgendamento = function(id) {
    try {
      let agendamentos = window.getAgendamentos();
      agendamentos = agendamentos.filter(a => a.id !== id);
      localStorage.setItem('clovisAgendamentos', JSON.stringify(agendamentos));
      return true;
    } catch (e) {
      console.error('Erro ao remover agendamento:', e);
      return false;
    }
  };

  window.horarioOcupado = function(data, hora) {
    const agendamentos = window.getAgendamentos();
    return agendamentos.some(a => a.data === data && a.horario === hora);
  };

  window.gerarLinkWhatsApp = function(agendamento) {
    const telefone = '555432236359';
    const mensagem = `Olá! Gostaria de confirmar meu agendamento no Clóvis Cabeleireiros:%0A%0A` +
      `📋 *Serviço:* ${agendamento.servico}%0A` +
      `📅 *Data:* ${agendamento.data}%0A` +
      `⏰ *Horário:* ${agendamento.horario}%0A` +
      `👤 *Nome:* ${agendamento.nome}%0A` +
      `📞 *Telefone:* ${agendamento.telefone}%0A` +
      `✉️ *E-mail:* ${agendamento.email}`;
    
    return `https://wa.me/${telefone}?text=${mensagem}`;
  };

  window.formatarData = function(dataStr) {
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  window.getDiaSemana = function(dataStr) {
    const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const data = new Date(dataStr + 'T12:00:00');
    return dias[data.getDay()];
  };

  // ============================================================
  // 9. WATERMARK ANIMADO COM PARALLAX 3D (Otimizado)
  // ============================================================
  const watermarkContainer = document.getElementById('watermark');
  
  if (watermarkContainer) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let scrollY = 0;
    let isVisible = true;

    // Detectar visibilidade para performance
    const heroSection = watermarkContainer.closest('.hero');
    const visibilityObserver = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    
    if (heroSection) visibilityObserver.observe(heroSection);

    // Mouse parallax com throttle
    let lastMouseMove = 0;
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastMouseMove < 16) return; // ~60fps throttle
      lastMouseMove = now;
      
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      }
    });

    // Scroll parallax
    window.addEventListener('scroll', () => {
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const heroHeight = heroSection.offsetHeight;
        const progress = Math.max(0, Math.min(1, (window.innerHeight - heroRect.top) / (window.innerHeight + heroHeight)));
        scrollY = (progress - 0.5) * 2;
      }
    });

    // Animação suave com requestAnimationFrame
    function animateWatermark() {
      if (isVisible) {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        const rotateX = currentY * -2;
        const rotateY = currentX * 2;
        const translateY = scrollY * -15;
        
        watermarkContainer.style.transform = `
          perspective(1200px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(${translateY}px)
        `;
      }
      
      requestAnimationFrame(animateWatermark);
    }

    animateWatermark();
  }

  // ============================================================
  // 10. EFECTO DE DIGITAÇÃO NO HERO (Opcional)
  // ============================================================
  const heroSubtitle = document.querySelector('.hero p');
  if (heroSubtitle && window.innerWidth > 768) {
    // Pequeno efeito de brilho no texto
    setInterval(() => {
      heroSubtitle.style.opacity = '0.7';
      setTimeout(() => {
        heroSubtitle.style.opacity = '1';
      }, 100);
    }, 3000);
  }

  console.log('✓ Clóvis Cabeleireiros — JS carregado com sucesso!');
  console.log(`✓ Modo: ${document.documentElement.getAttribute('data-theme')}`);
});