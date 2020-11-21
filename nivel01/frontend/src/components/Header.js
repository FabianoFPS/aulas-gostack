import React from 'react';

export const constanteExportadaDentroDeChaves = "valor da constante";

// export default function Headers(props) {
//   return (
//     <header>
//       <h1>{props.title}</h1>
//     </header>
//   )

export default function Headers({ title, children }) {
  return (
    <header>
      <h1>{title || ''}</h1>
      {children}
    </header>
  )
}