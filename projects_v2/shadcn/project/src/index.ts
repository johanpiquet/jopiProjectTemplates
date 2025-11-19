import {jopiApp} from "jopi-rewrite";

jopiApp.startApp(import.meta, jopiEasy => {
    jopiEasy.create_creatWebSiteServer()

        .fastConfigure_cors(["http://mywebsiteA", "http://mywebsiteB"])

        .fastConfigure_jwtTokenAuth("key", async (info: any) => {
            if (info.email == "allowed@domain.com") {
                return {
                    isOk: true,

                    userInfos: {
                        id: "user1",
                        roles: ["admin", "writer"]
                    }
                }
            }

            return {isOk: false};
        })
});