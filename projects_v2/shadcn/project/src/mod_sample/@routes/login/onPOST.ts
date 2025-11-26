import {JopiRequest, type LoginPassword} from "jopijs";

export default async function(req: JopiRequest) {
    const data = await req.req_getData();
    const authResult = await req.user_tryAuthWithJWT(data as LoginPassword);

    if (!authResult.isOk) console.log("Auth failed");

    // Will automatically set a cookie containing information.
    // It why we don't return these information here.
    return req.res_jsonResponse({isOk: authResult.isOk});
}