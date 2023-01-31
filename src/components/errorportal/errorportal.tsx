import React from 'react'
import { createPortal } from 'react-dom';

function ErrorPortal(props:{ children: React.ReactNode | React.ReactNode[], wrapperId:string}) {
    let {children,wrapperId} = {...props}
  if(!wrapperId)wrapperId = "error-portal-wrapper"
  let element = document.getElementById(wrapperId);
  
  if (!element) {
    element = createWrapperAndAppendToBody(wrapperId);
  }

  return createPortal(children, element);
}

function createWrapperAndAppendToBody(wrapperId:string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

export default ErrorPortal