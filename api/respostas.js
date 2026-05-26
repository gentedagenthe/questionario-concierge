export default async function handler(req, res) {
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
