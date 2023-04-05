import { interpret } from "xstate";
import { AppMachine } from "./machines/app.machine.js";
import { configure_globals } from "./actions/app.action.js";
configure_globals();
const App = interpret(AppMachine).onTransition((state) => {
    console.log(state.value);
}).start();
//# sourceMappingURL=index.js.map