# About

Each folder in the `@routes` directory match a URL segment.  
Example: the folder '@routes/my/url/route' match `http://localhost:3000/my/url/route`.

Here whe have four subfolder:

```
|- @routes/
   |- aboutRoutes/
      |- myAPI              < Listen "http://localhost:3000/aboutRoutes/myAPI"
      |- reactPage          < Listen "http://localhost:3000/aboutRoutes/reactPage"
      |- product            < Listen "http://localhost:3000/aboutRoutes/product/myProduct"    
      |- catchAll           < Listen "http://localhost:3000/aboutRoutes/catchAll"
```

You only have to create a directory to listen to his corresponding url.

**To see:**
- myAPI/ : show how listening to GET / POST calls.
- reactPage/ : show how using React.js to render a page.
- products/ : show how using "parametrized urls".
- catchAll/ : show how to catch all url