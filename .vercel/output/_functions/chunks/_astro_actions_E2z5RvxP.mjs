import { I as fetchStateSymbol } from "./console_P7_SNA55.mjs";
import { b as ActionCalledFromServerError, gt as AstroError } from "./remote_CyIg78iP.mjs";
import { O as createActionsProxy, i as getAction, k as createGetActionPath } from "./server_wuQ_QGiF.mjs";
createGetActionPath({
	baseUrl: "/",
	shouldAppendTrailingSlash: true
});
var actions = createActionsProxy({ handleAction: async (param, path, context) => {
	const state = context ? Reflect.get(context, fetchStateSymbol) : void 0;
	if (!state) throw new AstroError(ActionCalledFromServerError);
	const action = await getAction(state.manifest, path);
	if (!action) throw new Error(`Action not found: ${path}`);
	return action.bind(context)(param);
} });
export { actions as t };
