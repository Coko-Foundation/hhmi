/* stylelint-disable */
import { css } from 'styled-components'

import { th } from '@coko/client'

/* All styles regarding ProseMirror surface and elements */

const fontWriting = css`
  color: ${th('colorText')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
`

export default css`
  .ProseMirror {
    background: white;
    counter-reset: multiple-question;
    line-height: 1.6;
    ${fontWriting}

    p::selection,
    h1::selection,
    h2::selection,
    h3::selection,
    code::selection,
    span::selection,
    p span::selection,
    h1 span::selection,
    h2 span::selection,
    h3 span::selection,
    h4 span::selection,
    code span::selection,
    custom-tag-block::selection,
    custom-tag-inline::selection {
      background-color: transparent;
      color: #000;
    }

    &:focus {
      outline: none;
    }
  }

  .ProseMirror .wax-selection-marker {
    background-color: ${th('colorSelection')};
    opacity: 0.8;
  }

  div[contenteditable='false'] {
    .math-src {
      pointer-events: none;
      user-select: none;
    }
  }

  ul,
  ol {
    padding-left: 30px;
  }

  blockquote {
    border-left: 3px solid #eee;
    margin-left: 0;
    margin-right: 0;
    padding-left: 1em;
  }

  figure {
    display: none;
  }

  sup,
  sub {
    line-height: 0;
  }

  strong {
    font-weight: bold;
  }

  /* Tables */

  table {
    display: none;
  }

  /* invisible characters */
  .invisible {
    pointer-events: none;
    user-select: none;
  }

  .invisible:before {
    caret-color: inherit;
    color: gray;
    display: inline-block;
    font-weight: 400;
    font-style: normal;
    line-height: 1em;
    width: 0;
  }

  .invisible--space:before {
    content: '·';
  }

  .invisible--break:before {
    content: '¬';
  }

  .invisible--par:after {
    content: '¶';
  }

  /* == Math Nodes ======================================== */

  .math-node {
    min-width: 1em;
    min-height: 1em;
    font-size: 0.95em;
    font-family: 'Consolas', 'Ubuntu Mono', monospace;
    cursor: auto;
    .ProseMirror {
      box-shadow: none;
      min-height: 100%;
      padding: 0;
      background: #eee;
      color: rgb(132, 33, 162);
    }
  }

  .math-node.empty-math .math-render::before {
    content: '(empty)';
    color: red;
  }

  .math-node .math-render.parse-error::before {
    content: '(math error)';
    color: red;
    cursor: help;
  }

  .math-node.ProseMirror-selectednode {
    outline: none;
  }

  .math-node .math-src {
    color: rgb(132, 33, 162);
    display: none;
    tab-size: 4;
  }

  .math-node.ProseMirror-selectednode .math-src {
    display: flex;
  }
  .math-node.ProseMirror-selectednode .math-render {
    display: none;
  }

  /* -- Inline Math --------------------------------------- */

  math-inline {
    display: inline;
    white-space: nowrap;
  }

  math-inline .math-render {
    display: inline-block;
    font-size: 0.85em;
    cursor: pointer;
  }

  math-inline .math-src .ProseMirror {
    display: inline;
  }

  math-inline .math-src::after,
  math-inline .math-src::before {
    content: '$';
    color: #b0b0b0;
  }

  /* -- Block Math ---------------------------------------- */

  math-display {
    display: block;
  }

  math-display .math-render {
    display: block;
  }

  math-display.ProseMirror-selectednode {
    background-color: #eee;
  }

  math-display .math-src .ProseMirror {
    width: 100%;
    display: block;
  }

  math-display .math-src::after,
  math-display .math-src::before {
    content: '$$';
    text-align: left;
    color: #b0b0b0;
  }

  math-display .katex-display {
    margin: 0;
  }
  /* -- THIS IS A TEMP FIX FURTHER INVESTIGATION IN WAX? ---------------------------------------- */
  .katex-html {
    display: none;
  }
  /* -- Selection Plugin ---------------------------------- */

  p::selection,
  p > *::selection {
    background-color: #c0c0c0;
  }
  .katex-html *::selection {
    background-color: none !important;
  }

  .math-node.math-select .math-render {
    background-color: #c0c0c0ff;
  }
  math-inline.math-select .math-render {
    padding-top: 2px;
  }

  .transform-icon {
    transform: rotate(40deg);
  }

  /* -- Questions ---------------------------------- */

  /* -- Multiple Choice ---------------------------------- */

  .multiple-choice,
  .multiple-choice-single-correct,
  .true-false,
  .true-false-single-correct {
    display: none;
  }

  .fill-the-gap {
    display: none;
  }
`
