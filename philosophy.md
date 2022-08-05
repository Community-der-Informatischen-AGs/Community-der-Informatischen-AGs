# Software-Philosophy:

A loose set of rules to define the way the code is structured

- Be patient
- Focus on reusable code
- Always go back and create reusable components
- Single Components without many dependencies but with similar styling will be handled via Sass
- Components with different styling according to page (preview-components) will take stylesheets as parameter / props.
- Always come back here for insertions
- Pages with multiple single-use subcomponents will be divided up. The components will be found under pages/{pagename}/{componentname}

- focus on security instead of beauty first.
  - implement optionals
  - in general: implement helper functions to improve code security
