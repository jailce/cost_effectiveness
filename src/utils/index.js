export const calculateMetric = (item, isAlcoholMode) => {
  const price = parseFloat(item.price);
  const vol = parseFloat(item.vol);
  const qty = parseFloat(item.qty || 1);
  const abv = parseFloat(item.abv);

  if (isNaN(price) || isNaN(vol) || price <= 0 || vol <= 0) return null;
  if (isAlcoholMode && (isNaN(abv) || abv <= 0)) return null;

  const totalVolumeLiters = (vol * qty) / 1000;

  if (isAlcoholMode) {
    const pureAlcoholLiters = totalVolumeLiters * (abv / 100);
    return price / pureAlcoholLiters; // R$ por litro de álcool puro
  }

  return price / totalVolumeLiters; // R$ por litro de bebida
};

export const formatCurrency = (val) => {
  if (val === null || isNaN(val)) return '-';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
};
