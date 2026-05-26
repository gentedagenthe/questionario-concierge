-- Tabela de candidatos para a vaga de Concierge / Comercial
create table candidatos_concierge (
  id uuid default gen_random_uuid() primary key,
  criado_em timestamp with time zone default now(),
  status text default 'Novo',

  -- Etapa 1 — Dados Pessoais
  nome text,
  email text,
  telefone text,
  idade text,
  estado_civil text,
  filhos text,
  cidade text,
  bairro text,

  -- Etapa 2 — Formação e Experiência
  escolaridade text,
  curso_superior text,
  tempo_exp_atendimento text,
  descricao_experiencia text,
  exp_saude text,
  situacao_atual text,

  -- Etapa 3 — Perfil Comercial
  perfil_vendas text,
  faz_followup text,
  cenario_followup text,
  abordagem_indeciso text,
  exemplo_venda text,

  -- Etapa 4 — Atendimento e Ferramentas
  multi_atendimento text,
  paciente_dificil text,
  canais_digitais text,
  usa_sistema text,
  qual_sistema text,
  dominio_digital text,
  mkt_digital text,

  -- Etapa 5 — Motivação e Disponibilidade
  motivacao text,
  visao_atendimento text,
  lida_metas text,
  trabalhando_atualmente text,
  disponibilidade_inicio text,
  disponibilidade_horario text,
  ressalva_horario text,
  pretensao_salarial text,
  outro_processo text,
  informacoes_adicionais text
);

-- Habilitar RLS
alter table candidatos_concierge enable row level security;

-- Política: candidatos só podem inserir (não leem dados de outros)
create policy "insert_only" on candidatos_concierge
  for insert with check (true);

-- Política: service_role lê tudo (painel admin)
create policy "service_role_all" on candidatos_concierge
  for all using (auth.role() = 'service_role');
