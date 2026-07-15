/* ============================================================
   CLÓVIS CABELEIREIROS — Sistema de Agendamento
   Baseado no sistema Flutter original, adaptado para JS puro
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. POPULAR SELECT DE SERVIÇOS
  // ============================================================
  const servicoSelect = document.getElementById('servico');
  
  if (servicoSelect && typeof servicos !== 'undefined') {
    servicos.forEach(s => {
      const option = document.createElement('option');
      option.value = s.id;
      option.textContent = `${s.nome} — ${s.categoria} (${s.preco})`;
      option.dataset.categoria = s.categoria;
      servicoSelect.appendChild(option);
    });

    // Verificar se veio da query string ?servico=...
    const urlParams = new URLSearchParams(window.location.search);
    const servicoParam = urlParams.get('servico');
    
    if (servicoParam) {
      const servico = getServicoById(servicoParam);
      if (servico) {
        servicoSelect.value = servico.id;
        // Scroll suave até o formulário
        setTimeout(() => {
          document.querySelector('.agendamento-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }

  // ============================================================
  // 2. CALENDÁRIO — GRADE DE DIAS (Mini Calendário em JS)
  // ============================================================
  const calendarContainer = document.getElementById('calendario');
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let selectedDate = null;

  if (calendarContainer) {
    renderCalendar(currentMonth, currentYear);

    // Botões de navegação do calendário
    document.getElementById('calendar-prev')?.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) { currentMonth = 11; currentYear--; }
      renderCalendar(currentMonth, currentYear);
    });

    document.getElementById('calendar-next')?.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) { currentMonth = 0; currentYear++; }
      renderCalendar(currentMonth, currentYear);
    });
  }

  function renderCalendar(month, year) {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // Atualizar título
    document.getElementById('calendar-month-year').textContent = `${monthNames[month]} de ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let html = '<div class="calendar-weekdays">';
    dayNames.forEach(d => { html += `<span>${d}</span>`; });
    html += '</div><div class="calendar-days">';

    // Dias vazios antes do primeiro dia
    for (let i = 0; i < firstDay; i++) {
      html += '<span class="calendar-day empty"></span>';
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = dateObj.getTime() === today.getTime();
      const isPast = dateObj < today;
      const isSunday = dateObj.getDay() === 0; // Domingo
      const isSelected = selectedDate === dateStr;

      let classes = 'calendar-day';
      if (isToday) classes += ' today';
      if (isPast || isSunday) classes += ' disabled';
      if (isSelected) classes += ' selected';

      if (!isPast && !isSunday) {
        html += `<span class="${classes}" data-date="${dateStr}">${day}</span>`;
      } else {
        html += `<span class="${classes}">${day}</span>`;
      }
    }

    html += '</div>';
    calendarContainer.innerHTML = html;

    // Eventos de clique nos dias
    document.querySelectorAll('.calendar-day:not(.empty):not(.disabled)').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day.selected').forEach(d => d.classList.remove('selected'));
        el.classList.add('selected');
        selectedDate = el.dataset.date;
        document.getElementById('data-agendamento').value = selectedDate;
        
        // Re-renderizar horários ao selecionar data
        renderHorarios(selectedDate);
      });
    });
  }

  // ============================================================
  // 3. GRADE DE HORÁRIOS
  // ============================================================
  const horariosContainer = document.getElementById('horarios-grid');
  let selectedHorario = null;

  function renderHorarios(data) {
    if (!horariosContainer) return;

    const horarios = [];
    for (let h = 8; h <= 19; h++) {
      horarios.push(`${String(h).padStart(2, '0')}:00`);
      horarios.push(`${String(h).padStart(2, '0')}:30`);
    }

    let html = '';
    horarios.forEach(hora => {
      const ocupado = window.horarioOcupado(data, hora);
      const classes = `horario-btn${ocupado ? ' disabled' : ''}${selectedHorario === hora ? ' selected' : ''}`;
      html += `<button type="button" class="${classes}" data-horario="${hora}" ${ocupado ? 'disabled' : ''}>${hora}</button>`;
    });

    horariosContainer.innerHTML = html;

    // Eventos de clique nos horários
    horariosContainer.querySelectorAll('.horario-btn:not(.disabled)').forEach(btn => {
      btn.addEventListener('click', () => {
        horariosContainer.querySelectorAll('.horario-btn.selected').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedHorario = btn.dataset.horario;
        document.getElementById('horario').value = selectedHorario;
      });
    });
  }

  // ============================================================
  // 4. VALIDAÇÃO E SUBMISSÃO DO FORMULÁRIO
  // ============================================================
  const form = document.getElementById('form-agendamento');
  const confirmacaoDiv = document.getElementById('agendamento-confirmacao');
  const formFields = document.getElementById('form-fields');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Resetar erros
      document.querySelectorAll('.form-error.visible').forEach(el => el.classList.remove('visible'));
      document.querySelectorAll('.form-control.error').forEach(el => el.classList.remove('error'));

      let isValid = true;

      // Validação de campos
      const nome = document.getElementById('nome');
      const telefone = document.getElementById('telefone');
      const email = document.getElementById('email');
      const servico = document.getElementById('servico');
      const data = document.getElementById('data-agendamento');
      const horario = document.getElementById('horario');

      // Nome
      if (!nome.value.trim()) {
        showError(nome, 'Por favor, informe seu nome.');
        isValid = false;
      }

      // Telefone
      if (!telefone.value.trim()) {
        showError(telefone, 'Por favor, informe seu telefone.');
        isValid = false;
      } else if (!validarTelefone(telefone.value)) {
        showError(telefone, 'Telefone inválido. Use o formato (54) 99999-9999.');
        isValid = false;
      }

      // E-mail
      if (!email.value.trim()) {
        showError(email, 'Por favor, informe seu e-mail.');
        isValid = false;
      } else if (!validarEmail(email.value)) {
        showError(email, 'E-mail inválido. Exemplo: nome@email.com');
        isValid = false;
      }

      // Serviço
      if (!servico.value) {
        showError(servico, 'Por favor, selecione um serviço.');
        isValid = false;
      }

      // Data
      if (!data.value) {
        showError(data, 'Por favor, selecione uma data no calendário.');
        isValid = false;
      }

      // Horário
      if (!horario.value) {
        showError(horario, 'Por favor, selecione um horário.');
        isValid = false;
      }

      if (!isValid) return;

      // Montar objeto do agendamento
      const servicoObj = getServicoById(servico.value);
      const agendamento = {
        nome: nome.value.trim(),
        telefone: telefone.value.trim(),
        email: email.value.trim(),
        servico: servicoObj ? servicoObj.nome : servico.options[servico.selectedIndex].text,
        servicoId: servico.value,
        data: data.value,
        horario: horario.value,
        observacoes: document.getElementById('observacoes')?.value?.trim() || ''
      };

      // Salvar no localStorage
      const salvou = window.salvarAgendamento(agendamento);

      if (salvou) {
        // Mostrar confirmação
        mostrarConfirmacao(agendamento);
      } else {
        alert('Erro ao salvar agendamento. Tente novamente.');
      }
    });
  }

  function showError(input, message) {
    input.classList.add('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  function validarTelefone(telefone) {
    // Aceita formatos: (54) 3223-6359, (54) 99999-9999, 54999999999
    const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return regex.test(telefone.replace(/\s/g, ''));
  }

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function mostrarConfirmacao(agendamento) {
    if (!confirmacaoDiv || !formFields) return;

    // Esconder formulário
    formFields.style.display = 'none';

    // Preencher dados de confirmação
    document.getElementById('confirmacao-servico').textContent = agendamento.servico;
    document.getElementById('confirmacao-data').textContent = `${window.getDiaSemana(agendamento.data)}, ${window.formatarData(agendamento.data)}`;
    document.getElementById('confirmacao-horario').textContent = agendamento.horario;
    document.getElementById('confirmacao-nome').textContent = agendamento.nome;

    // Mostrar painel de confirmação
    confirmacaoDiv.classList.add('visible');

    // Botão WhatsApp
    const whatsappBtn = document.getElementById('btn-confirmar-whatsapp');
    if (whatsappBtn) {
      whatsappBtn.href = window.gerarLinkWhatsApp(agendamento);
      whatsappBtn.target = '_blank';
    }

    // Botão novo agendamento
    const novoBtn = document.getElementById('btn-novo-agendamento');
    if (novoBtn) {
      novoBtn.addEventListener('click', () => {
        confirmacaoDiv.classList.remove('visible');
        formFields.style.display = 'block';
        form.reset();
        selectedDate = null;
        selectedHorario = null;
        document.getElementById('data-agendamento').value = '';
        document.getElementById('horario').value = '';
        renderCalendar(currentMonth, currentYear);
        if (horariosContainer) horariosContainer.innerHTML = '';
      });
    }
  }

  // ============================================================
  // 5. LISTAR PRÓXIMOS AGENDAMENTOS
  // ============================================================
  const listaAgendamentos = document.getElementById('lista-agendamentos');

  function listarAgendamentos() {
    if (!listaAgendamentos) return;

    const agendamentos = window.getAgendamentos();
    
    // Ordenar por data e horário
    agendamentos.sort((a, b) => {
      if (a.data !== b.data) return a.data.localeCompare(b.data);
      return a.horario.localeCompare(b.horario);
    });

    // Filtrar apenas futuros
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const futuros = agendamentos.filter(a => {
      const dataAg = new Date(a.data + 'T12:00:00');
      return dataAg >= hoje;
    });

    if (futuros.length === 0) {
      listaAgendamentos.innerHTML = `
        <div class="agendamento-empty">
          <i class="fas fa-calendar-check" style="font-size: 2rem; color: var(--verde-medio); margin-bottom: 1rem; display: block;"></i>
          <p style="color: var(--texto-claro);">Nenhum agendamento futuro. <br>Agende seu horário agora!</p>
        </div>
      `;
      return;
    }

    let html = '';
    futuros.forEach(a => {
      html += `
        <div class="agendamento-item" data-id="${a.id}">
          <div class="agendamento-item-info">
            <h4>${a.servico}</h4>
            <p>
              <i class="fas fa-calendar-alt"></i> ${window.getDiaSemana(a.data)}, ${window.formatarData(a.data)} — 
              <i class="fas fa-clock"></i> ${a.horario}
            </p>
            <p><i class="fas fa-user"></i> ${a.nome}</p>
          </div>
          <div class="agendamento-item-actions">
            <button class="btn-cancelar" title="Cancelar agendamento" data-id="${a.id}">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      `;
    });

    listaAgendamentos.innerHTML = html;

    // Eventos de cancelamento
    listaAgendamentos.querySelectorAll('.btn-cancelar').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
          window.removerAgendamento(id);
          listarAgendamentos(); // Re-renderizar
        }
      });
    });
  }

  // Inicializar lista de agendamentos
  listarAgendamentos();

  // ============================================================
  // 6. MÁSCARA DE TELEFONE
  // ============================================================
  const telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      
      if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }
      
      e.target.value = value;
    });
  }

  console.log('✓ Sistema de agendamento carregado!');
});