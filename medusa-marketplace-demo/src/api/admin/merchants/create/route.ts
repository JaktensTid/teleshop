import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import {CreateMerchantInput, createMerchantWorkflow} from "../../../../workflows/create-merchant";

export async function POST(
    req: MedusaRequest<CreateMerchantInput>,
    res: MedusaResponse
): Promise<void> {
    const { result } = await createMerchantWorkflow(req.scope).run({
        input: req.body,
    });
    res.json(result);
}
