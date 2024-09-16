import Data from "../models/data";
import { DataAttributes } from "../types/data";

class DataService {
  // Create new data entry
  static async createData({
    telegramId,
    message,
    data,
  }: DataAttributes): Promise<Data> {
    return await Data.create({
      telegramId,
      message,
      data,
    });
  }

  // Get data by ID
  static async getDataById(id: number): Promise<Data | null> {
    return await Data.findByPk(id);
  }

  // Get data by Telegram ID
  static async getDataByTelegramId(telegramId: string): Promise<Data | null> {
    return await Data.findOne({
      where: { telegramId },
    });
  }

  // Update data by ID
  static async updateDataById(
    id: number,
    updateAttributes: Partial<DataAttributes>
  ): Promise<[number, Data[]]> {
    return await Data.update(updateAttributes, {
      where: { id },
      returning: true,
    });
  }

  // Delete data by ID
  static async deleteDataById(id: number): Promise<number> {
    return await Data.destroy({
      where: { id },
    });
  }

  // Get all data entries (with optional limit)
  static async getAllData(limit?: number): Promise<Data[]> {
    return await Data.findAll({
      limit,
      order: [['createdAt', 'DESC']],
    });
  }
}

export default DataService;
