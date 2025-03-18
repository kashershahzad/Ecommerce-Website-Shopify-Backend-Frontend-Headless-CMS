
export const formatPrice = (price: number): string => {
    const formattedPrice = price.toFixed(2);

    const parts = formattedPrice.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return parts.join('.');
  };