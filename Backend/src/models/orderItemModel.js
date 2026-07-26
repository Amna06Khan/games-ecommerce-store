import { sql } from "../utils/db.js";

const fixBigInt = (obj) => {
  if (!obj) return obj;
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );
};

export const addOrderItem = async ({ order_id, game_id, quantity }) => {
  await sql.query`
    INSERT INTO OrderItems (order_id, game_id, quantity)
    VALUES (${order_id}, ${game_id}, ${quantity})
  `;

  const result = await sql.query`
        SELECT TOP 1 * FROM OrderItems 
        WHERE order_id = ${order_id} 
      `;
  // console.log("result: ", fixBigInt(result.recordsets[0]));
  return fixBigInt(result.recordsets[0]);
};

export const getOrderItemsByOrderId = async (order_id) => {
  const result = await sql.query`
    SELECT * FROM OrderItems WHERE order_id = ${order_id}
  `;
  return result.recordset;
};

export const getAllOrderItems = async () => {
  const result = await sql.query`SELECT * FROM OrderItems`;
  return result.recordset;
};

export const updateOrderItem = async (order_item_id, quantity) => {
  await sql.query`
    UPDATE OrderItems
    SET quantity = ${quantity}
    WHERE order_item_id = ${order_item_id}
  `;
};

export const deleteOrderItem = async (order_item_id) => {
  await sql.query`
    DELETE FROM OrderItems WHERE order_item_id = ${order_item_id}
  `;
};
