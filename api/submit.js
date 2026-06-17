export default async function handler(req, res) {
  if (process.env.REACT_APP_INSCRICOES_ENCERRADAS === 'true') {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '40px'
    }}>
      <img src="/logo.png" alt="Genthe" style={{ width: 160, marginBottom: 32 }} />
      <h2 style={{ color: '#1B6FAB' }}>Inscrições encerradas</h2>
      <p style={{ color: '#555', maxWidth: 400 }}>
        O prazo para participação neste processo seletivo foi encerrado.<br/>
        Agradecemos o seu interesse.
      </p>
    </div>
  );
}
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
