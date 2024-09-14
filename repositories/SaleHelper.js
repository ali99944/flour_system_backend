import { BAD_REQUEST } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import PrismaClientService from "../utils/prisma_client.js";
import DateTimeRepository from "./Date.js";

class SaleHelperRepository {
  static prisma = PrismaClientService.instance;

  /**
   * Validates if the quantity of each flour item is sufficient
   * @param {Array<{ flour_id, quantity }>} items 
   * @returns {Promise<boolean>}
   */
  static validateFlourSufficiency = async (items) => new Promise(
    promiseAsyncWrapper(
      async (resolve, reject) => {
        // Check if items array is empty
        if (items.length === 0) {
          const no_items_error = new CustomError(
            "No items provided",
            BAD_REQUEST
          );

          return reject(no_items_error);
        }

        try {
          // Use Promise.all to wait for all asynchronous operations to complete
          await Promise.all(items.map(async ({ flour_id, quantity }) => {
            if (quantity <= 0) {
              const invalid_quantity_error = new CustomError(
                "Invalid quantity provided",
                BAD_REQUEST
              );

              throw invalid_quantity_error;
            }

            const flour = await this.prisma.flour.findUnique({
              where: {
                id: flour_id
              }
            });

            if (flour.stock < quantity) {
                const insufficient_stock_error = new CustomError(
                  `الكمية المطلوبة من ${flour.name} هي ${quantity} ولكن الكمية المتوفرة هي ${flour.stock}`,
                  BAD_REQUEST
                );
              
                throw insufficient_stock_error;
              }
              
          }));

          // Resolve the promise if all checks pass
          resolve(true);
        } catch (error) {
          // Reject the promise if any error occurs
          reject(error);
        }
      }
    )
  )

  /**
   * Deduct stock and get storage outs
   * @param {{ flour_id: number, quantity: number, client_id: number, client_price: number }} param0 
   * @returns {Promise<{ storage_outs: Array }>}
   */
  static deductAndGetStorageOuts = async ({ flour_id, quantity, client_id, client_price }) => {
    const storage_outs = [];
    let leftQuantity = quantity;

    // Define the recursive deduction function
    const deduct = async () => {
      const next_package = await this.prisma.flourPackage.findFirst({
        where: {
          flour_id: +flour_id,
        },
        orderBy: {
          created_at: 'asc',
        },
      });

      const { stock } = next_package;
      const deductQuantity = Math.min(leftQuantity, stock);

      // Create a storage out entry
      const storageOut = {
        quantity: deductQuantity,
        client_price: +client_price,
        total_client_charge: +client_price * deductQuantity,
        client_id: +client_id,
        flour_id: +flour_id,
        storage_in_id: next_package.storage_in_id,
        created_at: DateTimeRepository.getCurrentDate(),
      };

      storage_outs.push(storageOut);
      leftQuantity -= deductQuantity;

      if (leftQuantity > 0) {
        // Delete the package if fully used
        if (deductQuantity === stock) {
          await this.prisma.flourPackage.delete({
            where: {
              id: next_package.id,
            },
          });

          // Recursively continue deduction
          return deduct();
        }
      } else {
        // Update the package stock if partially used
        await this.prisma.flourPackage.update({
          where: {
            id: next_package.id,
          },
          data: {
            stock: {
              decrement: deductQuantity,
            },
          },
        });
      }
    };

    await deduct();
    return { storage_outs };
  };

  /**
   * Converts items into storage outs
   * @param {Array<{ flour_id: number, quantity: number, client_price: number }>} items 
   * @param {number} client_id 
   * @returns {Promise<Array>}
   */
  static convertItemsIntoStorageOuts = async ({
    items,
    client_id,
  }) => new Promise(
    promiseAsyncWrapper(
      async (resolve, reject) => {
        try {
          const storage_outs = [];
          let total_charge = 0

          // Iterate over each item
          await Promise.all(items.map(async ({ flour_id, quantity, client_price }) => {
            const result = await this.deductAndGetStorageOuts({
              flour_id,
              quantity,
              client_id,
              client_price
            });

            storage_outs.push(...result.storage_outs);

            total_charge += quantity * client_price
          }));

          resolve({
            total_charge,
            storage_outs
          });
        } catch (error) {
          reject(error);
        }
      }
    )
  );

  static computeNewFlourStock = async (storage_outs) => new Promise(
    promiseAsyncWrapper(
      async (resolve, reject) => {
        try {
          await Promise.all(storage_outs.map(async (storage_out) => {
            await this.prisma.flour.update({
              where: {
                id: +storage_out.flour_id
              },
              data: {
                stock: {
                  decrement: +storage_out.quantity
                }
              }
            })
          }))
          resolve(true)
        } catch (error) {
          reject(error)
        }
      }
    )
  )

  /*
    {
        quantity: 4,
        client_price: 4,
        total_client_charge: 16,
        client_id: 6,
        flour_id: 5,
        storage_in_id: 24,
        created_at: '25-07-2024 14:39'
    }
  */

  static computeIncomes = async (storage_outs) => new Promise(
    promiseAsyncWrapper(
      async (resolve, reject) => {
        const incomes = []

        try {
            await Promise.all(storage_outs.map(async (storage_out) => {
                const storage_in = await this.prisma.storageIn.findUnique({
                    where: {
                        id: +storage_out.storage_in_id
                    }
                })

                const income = {
                    flour_id: +storage_out.flour_id,
                    profit: storage_out.total_client_charge - (storage_in.unit_purchase_price * storage_out.quantity),
                    created_at: DateTimeRepository.getCurrentDate()
                }

                incomes.push(income)
            }))
          resolve(incomes)
        } catch (error) {
          reject(error)
        }
      }
    )
  )
}

export default SaleHelperRepository;
