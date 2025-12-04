import {jopiApp} from "jopijs";

// > This file 'index.ts' is our application entry-point.
//   The one executed once the application start.

// `jopiApp.startApp` allows starting our application.
jopiApp.startApp(

    // `import.meta` is a javascript feature allowing use to know
    // what is the full-path of this source code file.
    //
    // The JavaScript engine updates `import.meta` for each file
    // with information on this file.
    //
    import.meta,

    // jopiEasy is the entry point of a special API named "Intent API".
    // It's like a menu / submenu. Doing this allows reducing the complexity.
    jopiEasy => {
            // Create the website.
            // The url can be directly set here.
            // But the best practice is to use the env variable (process.env).
            //
            // It's defined at the '.env' file at the project root with these values:
            // JOPI_WEBSITE_URL=http://localhost:3000
            // JOPI_WEBSITE_LISTENING_URL=http://localhost:3000
            //
            // JOPI_WEBSITE_URL is used when JOPI_WEBSITE_LISTENING_URL
            // Where: JOPI_WEBSITE_LISTENING_URL is the url to listen
            // and JOPI_WEBSITE_URL is the url for url building / public url.
            //
            jopiEasy.create_webSiteServer()

            // Allows generating a local dev certificate.
            // The tool "mkcert" must be installed on your system.
            //
            /*.add_httpCertificate()
                .generate_localDevCert()
                .DONE_add_httpCertificate()*/
    }
);