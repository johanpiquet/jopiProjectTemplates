import {JopiEasyWebSite} from "jopi-rewrite";
import {JopiRequest} from "jopi-rewrite";

async function ipMiddleware(req: JopiRequest) {
    let ip = req.requestIP?.address;
    console.log("Caller IP is", ip);

    // null means it will continue to the next middleware.
    if (ip?.endsWith("127.0.0.1")) return null;

    // Returning a response stops the request processing.
    return req.returnError401_Unauthorized();
}

export default async function(webSite: JopiEasyWebSite) {
    webSite.configure_middlewares()
        .add_middleware(
            // Apply to GET call method only
            // You can also use "*" or undefined
            // if you want to apply to all methods.
            "GET",
            
            // Our function.
            ipMiddleware, {
                // Only url starting with "/tests/".
                regExp: /^\/tests\//
            }
        );
}