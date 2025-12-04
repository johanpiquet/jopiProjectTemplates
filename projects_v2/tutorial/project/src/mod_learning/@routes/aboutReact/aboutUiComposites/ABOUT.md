# About

UI Composite allows building a React Component of type list
where items are added by our modules.

For example, you have a toolbar and your modules must be able to add buttons to this toolbar.  
Then using UI Composites is the best way to do it.

To create a composite, you need to create a directory into `@alias/uiComposites/myCompositeName`. 
Inside this directory, your module add his own list items.

```
|- src/
   |- mod_learning/
      |- @alias/
         |- myCompositeName/
            |- firstItem/
                |- index.tsx        < The React component to show for this item
            |- mySecondItem/
                |- index.tsx        < Another one
            |- aThirdItem/          < And a third one
               |- index.tsx         
```

Jopi automatically creates a composant which content is equivalent to :

```typescript jsx
export default function() {
    return <>
        <AThirdItem />
        <FirstItem />
        <MySecondItem />
    </>
}
```

You can use import and use this component from anywhere in your app.  
```import MyCompositeName from "@/uiComposites/myCompositeName";```

The name of the items is important because Jopi uses it to know in which order to display them.
It's why here `AThirdItem` is inserted before the two other ones.

Any module can add items to this composite.
Doing it is simple: you create a composite with the same name, and Jopi will merge the items.

So if you have this:

```
|- src/
   |- mod_learning/
      |- @alias/
         |- myCompositeName/
            |- a1/
            |- a2/
            |- a3/
   |- mod_extension/
      |- @alias/
         |- myCompositeName/
            |- a1b/
```

then the result will be: `<><A1><A1b/><A2/><A3/></>`.