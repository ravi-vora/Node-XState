import { createMachine } from "xstate";
const signupMachine = createMachine({
    id: 'signupMachine',
    initial: 'validatePayload',
    states: {
        validatePayload: {
            id: 'validatePayload',
            invoke: {
                src: {
                    type: 'validate_signup_payload'
                }
            }
        }
    }
});
//# sourceMappingURL=auth.machine.js.map