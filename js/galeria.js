/* ============================================================
   CLÓVIS CABELEIREIROS — Galeria de Fotos
   Filtro por categoria + Lightbox
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. FILTRO POR CATEGORIA
  // ============================================================
  const filterBtns = document.querySelectorAll('.categoria-btn');
  const galleryItems = document.querySelectorAll('.galeria-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Atualizar estado ativo dos botões
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const categoria = btn.dataset.categoria;

        galleryItems.forEach(item => {
          if (categoria === 'todos' || item.dataset.categoria === categoria) {
            item.classList.remove('hidden');
            // Animação de entrada
            item.style.animation = 'none';
            item.offsetHeight; // reflow
            item.style.animation = 'fadeIn 0.4s ease';
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // ============================================================
  // 2. LIGHTBOX
  // ============================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImg) {
    // Abrir lightbox ao clicar na imagem
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Fechar lightbox
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    // Fechar ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Fechar com tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  console.log('✓ Galeria carregada!');
});