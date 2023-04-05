import { createMachine } from "xstate";

const signupMachine = createMachine(
    {
        /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGlgEsoMBXABwFkBDAYwAtCMx8RysiAXQrDVgD0QBaAGzoAnsJHI0IIiQo0GTMADoAbtQA2hCNU5gACtXFas1CK3ZcefJCEEIALACYJiABwBGVQFYADIH+Xr6hTl4u-k4yMkA */
        id: 'signupMachine',
        initial: 'validatePayload',
        states: {
            validatePayload: {
                id: 'validatePayload',
                invoke: {
                    src: {
                        type: 'validate_signup_payload' // TODO: left here...
                    }
                }
            }
        }
    }
)