"use client"

/**
 * ---- Hacked, don't erase! ----
 * johan.p: correction for defaultOpen to work correctly.
 */

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import React from "react";

function Collapsible({defaultOpen, ...props}: React.ComponentProps<typeof CollapsiblePrimitive.Root> ) {
  const [isOpen, setIsOpen] = React.useState(props.open || defaultOpen);
  React.useEffect(() => { setIsOpen(props.open || defaultOpen)}, [props.open, defaultOpen]);

  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} open={isOpen} onOpenChange={setIsOpen} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
