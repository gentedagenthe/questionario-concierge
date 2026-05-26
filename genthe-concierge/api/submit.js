export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const {
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY
  } = process.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: 'Variáveis de ambiente não configuradas' });
  }

  try {
    const dados = req.body;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/candidatos_concierge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(dados)
    });

    if (!response.ok) {
      const erro = await response.text();
      console.error('Erro Supabase:', erro);
      return res.status(500).json({ error: 'Erro ao salvar no banco de dados' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Erro interno:', err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
