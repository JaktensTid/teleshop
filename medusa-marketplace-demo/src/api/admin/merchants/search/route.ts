import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import {searchMerchantWorkflow} from "../../../../workflows/search-merchant";

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const { telegramId } = req.params;
    const { result } = await searchMerchantWorkflow(req.scope).run({
        input: {
            telegram_id: telegramId,
        },
    });
    res.json(result);
}
