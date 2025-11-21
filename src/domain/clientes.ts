import { api } from '../services/http';

export type Cliente = {
  id: number;
  nomeCompleto: string;
  email: string;
  createdAt: string;
};

export type CreateCliente = Omit<Cliente, 'id' | 'createdAt'>;

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

function mapCliente(x: any): Cliente {
  return {
    id: pick(x, ['id', 'Id', 'ID']) ?? 0,
    nomeCompleto: pick(x, ['nomeCompleto', 'NomeCompleto']) ?? '',
    email: pick(x, ['email', 'Email']) ?? '',
    createdAt: pick(x, ['createdAt', 'CreatedAt', 'dataCriacao', 'DataCriacao']) ?? '',
  };
}

export const clientesApi = {
  async list(): Promise<Cliente[]> {
    const raw = await api.get<any[]>('/api/Cliente');
    return raw.map(mapCliente);
  },
  async get(id: number): Promise<Cliente> {
    const raw = await api.get<any>(`/api/Cliente/${id}`);
    return mapCliente(raw);
  },
  async search(q: string): Promise<Cliente[]> {
    const raw = await api.get<any[]>(`/api/Cliente/search?query=${encodeURIComponent(q.trim())}`);
    return raw.map(mapCliente);
  },
  async create(data: CreateCliente): Promise<Cliente> {
    const raw = await api.post<any>('/api/Cliente', { NomeCompleto: data.nomeCompleto, Email: data.email });
    return mapCliente(raw);
  },
  async update(id: number, data: CreateCliente): Promise<void> {
    await api.put<void>(`/api/Cliente/${id}`, { NomeCompleto: data.nomeCompleto, Email: data.email });
  },
  async remove(id: number): Promise<void> {
    try {
      await api.del<void>(`/api/Cliente/${id}`);
    } catch (e: any) {
      const msg = String(e?.message || '');
      if (msg.includes('404') || msg.includes('405')) {
        await api.del<void>(`/api/Cliente?id=${id}`);
        return;
      }
      throw e;
    }
  }
};
