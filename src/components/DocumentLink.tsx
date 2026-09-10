import type { ComponentProps } from "react";

// Native cross-document View Transitions need document navigation, not router.push.
// Static hrefs also preserve navigation without JavaScript and in unsupported browsers.
export function DocumentLink(props: ComponentProps<"a">) {
  return <a {...props} />;
}
