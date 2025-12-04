import {JopiEasyWebSite} from "jopijs";
import users from "./myUsers.json";

// Here we will enable JWT and declare our users.
//
export default async function(webSite: JopiEasyWebSite) {
    // > Here we will configure 2 things:
    //
    // - An authentification mechanism allowing Jopi
    //      to identify users and know if they are logged-in.
    //
    // - A user store, in which we declare our user.
    //      Here it's a simple in-memory store, but it can
    //      easily be extended to a more complex one for your needs.
    //
    // To know: all this can be shortened with:
    //      fastConfigure_jwtTokenAuth("MY_SUPER_SECRET_KEY", users)
    //
    webSite.configure_jwtTokenAuth()
        // First step: set a key used to encrypt token private part.
        .step_setPrivateKey("MY_SUPER_SECRET_KEY")

        // Second step: create the user store.
        .step_setUserStore()
            // Here we use a simple store which will receive
            // the use login and password, without hash.
            .use_simpleLoginPassword()

                // Now we add our users.
                .addMany(users)

                // Call of type DONE_??? allows us
                // to know that we have reached the last step.
                .DONE_use_simpleLoginPassword()
            .DONE_setUserStore()
        .DONE_configure_jwtTokenAuth()
}