export interface DocItem {
  title: string;
  syntax: string;
  summary: string;
  mdn?: string;
}

export const MDN_CSS_DOCS: Record<string, DocItem> = {
  display: {
    title: 'display',
    syntax: 'display: flex | grid | block | inline-block | none | contents;',
    summary: 'Sets whether an element is treated as a block or inline box and the layout used for its children (e.g. flex, grid).',
  },
  'justify-content': {
    title: 'justify-content',
    syntax: 'justify-content: center | space-between | space-around | space-evenly | flex-start | flex-end;',
    summary: 'Defines how the browser distributes space between and around content items along the main axis of a flex container, or the inline axis of a grid container.',
  },
  'align-items': {
    title: 'align-items',
    syntax: 'align-items: center | flex-start | flex-end | stretch | baseline;',
    summary: 'Sets the align-self value on all direct children as a group. Controls alignment along the cross axis in flexbox.',
  },
  'grid-template-columns': {
    title: 'grid-template-columns',
    syntax: 'grid-template-columns: repeat(3, 1fr) | 200px 1fr | auto 1fr;',
    summary: 'Defines the line names and track sizing functions of the grid columns.',
  },
  position: {
    title: 'position',
    syntax: 'position: relative | absolute | fixed | sticky | static;',
    summary: 'Sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location.',
  },
  gap: {
    title: 'gap',
    syntax: 'gap: <row-gap> <column-gap>? | 16px;',
    summary: 'Sets the gaps (gutters) between rows and columns in grid, flex, and multi-column layouts.',
  },
  flex: {
    title: 'flex',
    syntax: 'flex: <flex-grow> <flex-shrink>? || <flex-basis>?;',
    summary: 'Shorthand property setting how a flex item will grow or shrink to fit the space available in its flex container.',
  },
  'backdrop-filter': {
    title: 'backdrop-filter',
    syntax: 'backdrop-filter: blur(12px) | brightness(60%) | contrast(200%);',
    summary: 'Applies graphical effects such as blurring or color shifting to the area behind an element.',
  },
};

export const MDN_JSX_DOCS: Record<string, DocItem> = {
  useState: {
    title: 'useState',
    syntax: 'const [state, setState] = useState(initialState);',
    summary: 'React Hook that lets you add a state variable to your component.',
  },
  useEffect: {
    title: 'useEffect',
    syntax: 'useEffect(() => { ... return () => cleanup(); }, [deps]);',
    summary: 'React Hook that lets you synchronize a component with an external system.',
  },
  useRef: {
    title: 'useRef',
    syntax: 'const ref = useRef(initialValue);',
    summary: 'React Hook that lets you reference a value that’s not needed for rendering (persists across renders).',
  },
  className: {
    title: 'className',
    syntax: '<div className="container px-4 py-2">',
    summary: 'Specifies one or more CSS class names for an HTML element in JSX.',
  },
};
