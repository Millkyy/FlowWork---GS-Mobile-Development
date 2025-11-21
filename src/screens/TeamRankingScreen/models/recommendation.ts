export type RiskProfile = 'Conservador' | 'Moderado' | 'Agressivo';

export type RecommendationItem = {
  name: string;
  desc: string;
};

export const recommendations: Record<RiskProfile, RecommendationItem[]> = {
  Conservador: [
    { name: 'Fundo DI XP', desc: 'Alta liquidez, baixo risco, atrelado ao CDI.' },
    { name: 'Tesouro Selic', desc: 'Garantia do Tesouro Nacional, ideal para reserva de emergência.' },
  ],
  Moderado: [
    { name: 'Fundo Balanceado XP', desc: '50% RF, 50% RV – equilíbrio entre segurança e retorno.' },
    { name: 'Tesouro IPCA+', desc: 'Proteção contra a inflação com rendimento real.' },
  ],
  Agressivo: [
    { name: 'Fundo Ações XP', desc: 'Alto potencial de retorno, maior volatilidade.' },
    { name: 'Fundos Imobiliários', desc: 'Renda periódica e possível valorização de ativos.' },
  ],
};
