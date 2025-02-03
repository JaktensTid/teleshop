import {createStep, StepResponse} from "@medusajs/framework/workflows-sdk";
import {ContainerRegistrationKeys, Modules} from "@medusajs/framework/utils";
import {IStoreModuleService} from "@medusajs/framework/types";

export const searchMerchantByTgStep = createStep(
    "search-merchant-by-tg",
    async (telegramId: string, {container}) => {
        let query = container.resolve(ContainerRegistrationKeys.QUERY)

        const {data: users} = await query.graph({
            entity: "user",
            fields: ["id"],
            filters: {
                metadata: {
                    telegram_id: telegramId
                }
            }
        });

        let userId: string | null = users.length > 0 ? users[0].id : null;
        let storeId: string | unknown;

        if(userId != null){
            query = container.resolve(ContainerRegistrationKeys.QUERY);
            const {data: users} = await query.graph({
                entity: "user",
                fields: ["store.*"],
                filters: {
                    "id": [userId!]
                }
            });

            if(users.length > 0){
                storeId = users[0].store.id;
            }
        }

        const merchant = userId != null ? {
            user_id: userId,
            store_id: storeId
        } : null;

        return new StepResponse({merchant: merchant});
    }
);
