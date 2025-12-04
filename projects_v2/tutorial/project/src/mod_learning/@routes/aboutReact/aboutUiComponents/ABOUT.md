# About

Jopi allows sharing React components between modules.

To do this, you need to create a directory into `@alias/uiComponents/yourComponentNames`

```
|- src/
   |- mod_learning/
      |- @alias/
         |- uiComponents/
            |- mySharedComponent/
                |- index.tsx
                |- style.module.css     (optional)
                |- default.priority     (automatically added)
```

Once done, you can use it from anywhere in your app.  
```import MySharedComponent from "@/uiComponents/mySharedComponent";```

Other modules can override shared components. Doing it is simple:
* You need to share a component with the same name.
* You give him a higher priority.

Priority is defined through a file.  
If not priority is set, then the file `default.priority` is automatically added by Jopi.

The priority are:
* default.priority
* high.priority
* veryhigh.priority

With the addition to special usage priorities:
* low.priority
* verylow.priority
