import {JopiRequest, type LoginPassword} from "jopi-rewrite";

export default async function(req: JopiRequest) {
    const data = await req.getBodyData();
    const authResult = await req.tryAuthWithJWT(data as LoginPassword);

    if (!authResult.isOk) console.log("Auth failed");

    // Will automatically set a cookie containing information.
    // It why we don't return these information here.
    return req.jsonResponse({isOk: authResult.isOk});
}