import { api, BASE_URL } from '../services/http';

export type Investimento = {
  id: number;
  nomeInvestimento: string;
  valorAplicado: number;
  dataAplicacao: string;
  clienteId: number;
  cliente?: { id: number; nomeCompleto: string; email: string };
};

export type CreateInvestimento = {
  nomeInvestimento: string;
  valorAplicado: number;
  clienteId: number;
};

// util: pega a prop ignorando variações de nome/case
function pick(o: any, names: string[]) {
  if (!o) return undefined;
  for (const n of names) if (o[n] !== undefined && o[n] !== null) return o[n];
  const lower: Record<string, any> = {};
  Object.keys(o).forEach(k => (lower[k.toLowerCase()] = o[k]));
  for (const n of names) {
    const v = lower[n.toLowerCase()];
    if (v !== undefined && v !== null) return v;
  }
  return undefined;
}
function toNumber(v: any) {
  if (typeof v === 'string') return Number(v.replace(',', '.'));
  return Number(v);
}

function mapInvest(x: any): Investimento {
  const cli = pick(x, ['cliente', 'Cliente']);
  return {
    id: pick(x, ['id', 'Id', 'ID']) ?? 0,
    nomeInvestimento: pick(x, ['nomeInvestimento', 'NomeInvestimento']) ?? '',
    valorAplicado: toNumber(pick(x, ['valorAplicado', 'ValorAplicado', 'valor', 'Valor']) ?? 0),
    dataAplicacao: pick(x, ['dataAplicacao', 'DataAplicacao', 'data', 'Data']) ?? '',
    clienteId: toNumber(pick(x, ['clienteId', 'ClienteId', 'clienteID', 'ClienteID']) ?? 0),
    cliente: cli
      ? {
          id: pick(cli, ['id', 'Id', 'ID']) ?? 0,
          nomeCompleto: pick(cli, ['nomeCompleto', 'NomeCompleto']) ?? '',
          email: pick(cli, ['email', 'Email']) ?? '',
        }
      : undefined,
  };
}

export const investimentosApi = {
  async list(): Promise<Investimento[]> {
    const raw = await api.get<any[]>('/api/Investimento');
    return raw.map(mapInvest);
  },

  async search(q: string): Promise<Investimento[]> {
    const raw = await api.get<any[]>(
      `/api/Investimento/search?query=${encodeURIComponent(q.trim())}`,
    );
    return raw.map(mapInvest);
  },

  // CREATE — tenta JSON, urlencoded e multipart em várias rotas
  async create(data: CreateInvestimento): Promise<void> {
    const valor = Number(String(data.valorAplicado).replace(',', '.'));
    const nowIso = new Date().toISOString();

    const jsonPayloads = [
      { NomeInvestimento: data.nomeInvestimento, ValorAplicado: valor, ClienteId: data.clienteId, DataAplicacao: nowIso },
      { NomeInvestimento: data.nomeInvestimento, ValorAplicado: valor, Cliente: { Id: data.clienteId }, DataAplicacao: nowIso },
      { nomeInvestimento: data.nomeInvestimento, valorAplicado: valor, clienteId: data.clienteId, dataAplicacao: nowIso },
    ];

    const routes = [
      '/api/Investimento',
      '/api/Investimento/Create',
      '/api/Investimentos',
      '/api/Investimentos/Create',
      '/Investimento',
      '/Investimentos',
    ];

    let lastErr: any;

    // 1) JSON
    for (const body of jsonPayloads) {
      for (const r of routes) {
        try {
          await api.post<void>(r, body);
          return;
        } catch (e: any) {
          lastErr = e;
        }
      }
    }

    // 2) x-www-form-urlencoded
    const formPairs = [
      { NomeInvestimento: data.nomeInvestimento, ValorAplicado: String(valor), ClienteId: String(data.clienteId), DataAplicacao: nowIso },
      { nomeInvestimento: data.nomeInvestimento, valorAplicado: String(valor), clienteId: String(data.clienteId), dataAplicacao: nowIso },
    ];

    for (const pairs of formPairs) {
      const params = new URLSearchParams();
      Object.entries(pairs).forEach(([k, v]) => params.append(k, String(v)));
      for (const r of routes) {
        try {
          const url = r.startsWith('http') ? r : `${BASE_URL}${r}`;
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text()}`);
          return;
        } catch (e: any) {
          lastErr = e;
        }
      }
    }

    // 3) multipart/form-data
    for (const pairs of formPairs) {
      const fd = new FormData();
      Object.entries(pairs).forEach(([k, v]) => fd.append(k, String(v)));
      for (const r of routes) {
        try {
          const url = r.startsWith('http') ? r : `${BASE_URL}${r}`;
          const res = await fetch(url, { method: 'POST', body: fd });
          if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text()}`);
          return;
        } catch (e: any) {
          lastErr = e;
        }
      }
    }

    throw new Error(
      `Falha ao cadastrar investimento. Último erro: ${String(lastErr?.message || lastErr || '')}`,
    );
  },

  // UPDATE — com fallbacks de rota e Id no corpo
  async update(id: number, data: CreateInvestimento): Promise<void> {
    const payload = {
      Id: id,
      NomeInvestimento: data.nomeInvestimento,
      ValorAplicado: data.valorAplicado,
      ClienteId: data.clienteId,
      Cliente: { Id: data.clienteId },
    };

    try {
      await api.put<void>(`/api/Investimento/${id}`, payload);
      return;
    } catch (e: any) {
      const msg = String(e?.message || '');
      if (msg.includes('404') || msg.includes('405')) {
        try {
          await api.put<void>(`/api/Investimento?id=${id}`, payload);
          return;
        } catch (e2: any) {
          const msg2 = String(e2?.message || '');
          if (msg2.includes('404') || msg2.includes('405')) {
            await api.put<void>(`/api/Investimento`, payload);
            return;
          }
          throw e2;
        }
      }
      throw e;
    }
  },

  // DELETE — com fallback ?id=
  async remove(id: number): Promise<void> {
    try {
      await api.del<void>(`/api/Investimento/${id}`);
    } catch (e: any) {
      const msg = String(e?.message || '');
      if (msg.includes('404') || msg.includes('405')) {
        await api.del<void>(`/api/Investimento?id=${id}`);
        return;
      }
      throw e;
    }
  },
};
