import {JopiEasyWebSite} from "jopijs";

// > This file 'serverInit.ts' is automatically called
//   when the server starts, after processing the content
//   of the file `src/index.ts`.
//
export default async function(webSite: JopiEasyWebSite) {
    // `webSite` is the instance returned by this function
    // inside the file `src/index.ts`.
    //
    // jopiEasy.create_webSiteServer()
    //
    // It means that most of the content of `src/index.ts`
    // can be put inside our modules `serverInit.ts` file.
    //
    // Doing this can be a good thing, for example, if you are
    // creating a module implementing a custom authentification protocol.
    // Since enabling this module allows automatically enabling this protocol.
}