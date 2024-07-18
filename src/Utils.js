
import { format } from 'date-fns';
  export const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };


  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd - MM - yyyy'); // Sesuaikan format tanggal sesuai keinginan
  };