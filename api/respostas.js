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
  const { SUPABASE_URL, SUPABASE_SERVICE_KEY, ADMIN_PASSWORD } = process.env;

  const senha = (req.headers['x-admin-password'] || '').trim();
  const senhaCorreta = (ADMIN_PASSWORD || '').trim();

  if (senha !== senhaCorreta) {
    return res.status(401).json({ 
      error: 'Não autorizado',
      recebido: senha.length,
      esperado: senhaCorreta.length
    });
  }

  const base = `${SUPABASE_URL}/rest/v1/candidatos_concierge`;
  const headers = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
  };

  if (req.method === 'GET') {
    const resp = await fetch(`${base}?select=*&order=criado_em.desc`, { headers });
    const dados = await resp.json();
    return res.status(200).json(dados);
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body;
    const resp = await fetch(`${base}?id=eq.${id}`, {
      method: 'PATCH',
      headers: { ...headers, 'Prefer': 'return=minimal' },
      body: JSON.stringify({ status })
    });
    if (!resp.ok) return res.status(500).json({ error: 'Erro ao atualizar' });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
