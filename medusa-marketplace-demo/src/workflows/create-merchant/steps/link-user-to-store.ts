import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import {IStoreModuleService, IUserModuleService} from "@medusajs/framework/types";

type LinkUserToStoreStepInput = {
  userId: string;
  storeId: string;
};

export const linkUserToStoreStep = createStep(
  "link-user-to-store",
  async ({ userId, storeId }: LinkUserToStoreStepInput, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.LINK);

    const linkArray = remoteLink.create({
      [Modules.USER]: {
        user_id: userId,
      },
      [Modules.STORE]: {
        store_id: storeId,
      },
    });

    return new StepResponse(linkArray, {
      userId,
      storeId,
    });
  },
  async ({ userId, storeId }, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.LINK);

    remoteLink.dismiss({
      [Modules.USER]: {
        user_id: userId,
      },
      [Modules.STORE]: {
        store_id: storeId,
      },
    });
  }
);
