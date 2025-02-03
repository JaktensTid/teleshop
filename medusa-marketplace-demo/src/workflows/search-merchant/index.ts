import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {searchMerchantByTgStep} from "./steps/search-merchant-by-tg";

export type SearchMerchantInput = {
    telegram_id: string;
};

export const searchMerchantWorkflow = createWorkflow(
    "search-merchant",
    (input: SearchMerchantInput) => {
        const merchant = searchMerchantByTgStep(input.telegram_id);

        return new WorkflowResponse(merchant);
    }
);
