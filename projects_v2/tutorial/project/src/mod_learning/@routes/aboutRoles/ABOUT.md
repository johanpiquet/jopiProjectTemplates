# About Roles

## What is role-based access control?

Each user can have a list of roles, which are security / permissions groups
allowing the user to access certain parts of the application.

In your application, you say what roles are allowed to access your page or, for example,
to do a POST call to this route (url).

## How to enable roles?

Concretely with Jopi, the only thing you need is to copy-paste the `mod_userAuth` folder into your project. 
Once done, you need to edit the file `mod_userAuth/myUsers.json` which contains your users.

Internally, this module:
* Adds a login page (see `mod_userAuth/@routes/login`).
* Manages a user list (see `mod_userAuth/serverInit.ts` > `step_setUserStore`).
* Enables JWT token authentification (see `mod_userAuth/serverInit.ts` > `configure_jwtTokenAuth`).

## What are JWT token?

JWT token authentification is the default authentification mechanism with Jopi.
It allows securely storing user credentials in a cookie.

* The informations stored in this cookie are public.
* The cookie is signed with a secret key.
* This signature allows verifying that the cookie has not been tampered with.

The great thing with JWT are:
* The toke is not bound to only one application
  * It can be the same for all your enterprise applications. 
  * Even if the domaine name is different.
* Your browser-JavaScript can read this cookie and get information about the user.
  * It avoids doing a ajax call to get user information.
  * The cookie mechanism manages the session life-time and refreshes it automatically.
* The server-side can verify that the cookie has not been tampered with.
  * Which is automatically done by Jopi.
  * Jopi manages all the complexity.
* The server-side doesn't need to request a server each time he receives a request.
  * It was like that in the old-time :-) .. very slow, and heavy.

## How to set role restrictions?

Jopi offers two ways to work with roles:
* Put some annotations in a route folder.
* Use the low-level API exposed by `JopiRequest`.

In the folder /admin you can see a file named `pageNeedRole_admin.cond`.
This file declares that this page is only accessible to users with the role "admin".
If you add a file named `pageNeedRole_writer.cond`, thant the user need to be "admin" + "writer".

The format of this file is `whatNeedRole_roneName.cond` where the `what` part is:
* `page` to add the condition on the page (what the browser sees).
* `get` to add the condition on the GET call (when doing API calls).
* `post`, `put`, `deltete` : all the HTTP methods.

You can also omit the `what` part, in which case the condition is applied on all HTTP methods and the page.
Example: `needRole_admin.cond` apply to everything.

## Hiding some part of your screen

Something, a part of your page must be hidden for some users.
For that, you can use the `RequireRoles` component. See: `hideIfMissingRole/page.tsx` for a sample.

## Hiding menu entries for some users

With Jopi, each page registry itself to the menu, while Jopi automatically generates
the menu and manages role checking when displaying the menu.

It means that if the user has not the roles required to access a page, then the menu entry is not displayed.

If you see the file `admin/config.ts`, you can see `config.menu_addToLeftMenu(["Roles demo",  "Admin only"]);`.
This means **add me to the left menu, under the menu entry 'Roles demo' and the sub-menu entry 'Admin only'**.

It's very simple! Also, you can add options to set the order of the menu entries, and an icon.

