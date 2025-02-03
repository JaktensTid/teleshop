import {createStep, StepResponse} from "@medusajs/framework/workflows-sdk";
import {CreateMerchantInput} from "..";
import {ContainerRegistrationKeys, Modules} from "@medusajs/framework/utils";
import {
    IUserModuleService,
    IAuthModuleService,
    AuthenticationInput, UserDTO,
} from "@medusajs/framework/types";

export const createUserStep = createStep(
    "create-user-step",
    async (input: CreateMerchantInput, {container}) => {
        const userService: IUserModuleService = container.resolve(Modules.USER);
        const authService: IAuthModuleService = container.resolve(Modules.AUTH);

        const user = await userService.createUsers({
            ...input,
            metadata: {is_super_admin: input.is_super_admin, ...input.metadata},
        });

        const registerResponse = await authService.register("emailpass", {
            body: {
                email: input.email,
                password: input.password,
            },
        } as AuthenticationInput);

        await authService.updateAuthIdentities({
            id: registerResponse.authIdentity.id,
            app_metadata: {
                user_id: user.id,
            },
        });

        return new StepResponse({user}, user.id);
    },
    async (id: string, {container}) => {
        const userModuleService: IUserModuleService = container.resolve(
            Modules.USER
        );

        await userModuleService.deleteUsers([id]);
    }
);
