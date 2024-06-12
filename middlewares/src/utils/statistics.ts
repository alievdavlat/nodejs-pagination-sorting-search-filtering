import Store from '../models/Store';
import { Op } from 'sequelize';

interface Statistics {
  averageSales: number;
  totalSales: number;
  storeCount: number;
}

export const getStatistics = async (startDate: Date, endDate: Date): Promise<Statistics> => {
  const stats = await Store.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    attributes: [
      [sequelize.fn('AVG', sequelize.col('sales')), 'averageSales'],
      [sequelize.fn('SUM', sequelize.col('sales')), 'totalSales'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'storeCount'],
    ],
  });

  return {
    averageSales: stats[0].get('averageSales') as number,
    totalSales: stats[0].get('totalSales') as number,
    storeCount: stats[0].get('storeCount') as number,
  };
};

export const getSalesByDate = async (startDate: Date, endDate: Date): Promise<{ date: Date; sales: number }[]> => {
  const sales = await Store.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    attributes: [
      [sequelize.fn('DATE', sequelize.col('date')), 'date'],
      [sequelize.fn('SUM', sequelize.col('sales')), 'sales'],
    ],
    group: ['date'],
    order: [['date', 'ASC']],
  });

  return sales.map((s) => ({
    date: s.get('date') as Date,
    sales: s.get('sales') as number,
  }));
};
