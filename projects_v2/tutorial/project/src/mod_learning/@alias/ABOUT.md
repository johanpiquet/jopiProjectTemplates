# About

This directory is part of Jopi. It allows sharing items between modules.

```
|- @alias/
    |- uiComponents             < For sharing React components
    |  |- uiComponentA          < The name of the component
    |     |- index.tsx          < His implementation
    |     |- default.priority
    |
    |- uiComposites             < For list based React components
    |  |- myComposite           < The name of the list we build
    |     |- CompA              < A component to add to this list
    |     |- CompB              < A second component to add
    |        |- index.tsx       < This component implementation
    |
    |- events                   < For sharing events
    |  |- my.event.name             < The name of the event
    |     |- listenerNameA      < Each listener has a name which only role
    |     |- listenerNameB          is to know the calling order (sorted ASC)
    |        |- index.tsx        < Contains the function to call. 
    |
    |- schemes                  < For data description schemes
    |  |- schemeName            < The name of the scheme.
    |     |- index.tsx           < Define the scheme.
```

As you can see, there is four things the `@alias` expose.

**uiComponents** allows sharing React component.
- Each shared component can be accessed from anywhere
  by doing `import UiComponentA from "@/uiComponents/uiComponentA"`.
- The priority (here `default.priority`) allows a module
  to override existing components. **Higher priority win**.
- The priorities are : `veryhigh`, `high`, `default`, `low`, `verylow`.

**uiComposites** allows building React component of type list.
- Here our component will be something like : `<><CompA /><CompB /></>`.
- It can be imported from anywhere with: `import MyComposite from "@/uiComposites/myComposite"`.
- The only role of the names `CompA` and `CompB` is to set the item list order.
  - Directory are sort ASC.
  - Then processed to create the list in the correct order.

**events** allows communication through an event / listeners patterns.
- Each module can declare listeners and add it to an event name.
- These listeners names are sorted ASC in order to known
  in which order Jopi must call these events listeners.
- Once declared, you can do from anywhere:
  - `import myEvent from "@/events/my.event.name"`
  - `myEvent.send(myData)`
- This will call each listener and send them `myData`.

**schemes** allow us to describe a data structure.
- In order to validate data received.
- Or automatically generate HTML forms.
- With possibility to extend it with ORM features.
