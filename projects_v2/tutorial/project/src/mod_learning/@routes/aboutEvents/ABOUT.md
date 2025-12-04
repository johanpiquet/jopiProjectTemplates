# About

## The event-listeners pattern

Event-listener is a pattern allowing to decouple the code.

It's like if some people, we don't know who, said "this thing xxx is happening" while other people
listen to it and do something in response. These two groups of people don't need to know each other,
they only need to know what it means when xxx is happening.

This pattern is very useful when building an application with modules, where modules can be developed
by different teams and added after the application core has been built.

The difficulty with this pattern is his implementation in React. The idea behind this pattern is very
easy to implement, but there is a big difficulty coming the code bundler (Vite.js / WebPack /...).
The reason is that the code bundler does a static analysis of the code and removes unused code, which with
the event-listeners pattern leads to removing too much code.

Jopi solves this problem by generating intermediate code, ensuring that the bundler neither removes useful code 
nor includes unnecessary code.

Also, Jopi addresses another issue with this pattern: generally, it's challenging to debug code that uses this pattern 
because we need to read the code to know who listen to which event. Moreover, when the event name is dynamically built
(it's a terrible practice, but it's frequently found with event-listeners systems).

Jopi solves this second problem by imposing some convention in your code, ensuring that all events and all listeners
can always be found in the same place by applying the same logic. It's a bit of a hassle, but actually it's very useful.

## Declaring events

Here is a sample of how you declare an event and his listeners:
```
|- mod_learning
   |- @events                       < Where all our event are declared
      |- card.product.added/        < Our event name
         |- refreshPrice/           < The listener name
            |- index.ts             < Contains the listener code
         |- startAnimation/         < A second listener          
|- mod_overriding         
   |- @events                       < Each module can declare events
      |- card.product.added/        < And add listeners to an existing event
         |- thirdListener/          < The only utility of listener names is to known 
            |- index.ts             <   in which order listeners are called
```

The listener names are sorted in ASC order, which allows knowing in which order listeners must be called.

## Calling events

Once declared, an event can be imported.
```typescript
import cardEvent from "@/events/card.product.added";
```

And once imported, you call it like this.
```typescript
cardEvent.send({productId: 123456789});
```

You can send any data with your event, which is sent as-is to the listeners.

## React hook

The event-listeners pattern is very useful in React, since events are generally sent in reaction of a user action.
Inside a React component, you send an event in the same way. 

What is different is when you want your React component to react to an event.  
Jopi allows declaring listeners inside a React component, which will be called when the event is sent.
Their role must be UI updating and animating, nothing else. Otherwise, your code will become a mess ...

```typescript jsx
import style from "./style.module.css";
import {useCssModule} from "jopijs/ui";
import myEvent from "@/events/card.product.added";

export default function() {
    useCssModule(style);
    const [refreshCount, setRefreshCount] = useState(0);

    // Here is how you declare a listener inside a React component
    // Registering / unregistering the listenr when
    // the component mount/unmount is done automatically by Jopi.
    //
    myEvent.reactListener(() => {
        setRefreshCount(c => c + 1);
    });

    return <div>refreshCount value is {refreshCount}</div>;
}
```