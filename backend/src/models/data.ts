import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";

class Data extends Model {
  public id!: number;
  public telegramId!: string;
  public message?: string;
  public data!: any; 
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Data.init(
  {
    telegramId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Data",
    timestamps: true,
  }
);

export default Data;
